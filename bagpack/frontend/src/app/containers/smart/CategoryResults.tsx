import React, { useState, useEffect, useCallback, useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/app/provider/UserProvider";
import DragDropContainer from "@/components/DragDrop";
import Loading from "@/components/Loading";
import useSchedule from "@/store/schedule";
import { PostWithClassification, ClassificationResult } from "@/types/smart";
import { classify, feedback } from "@/utils/axios/fetcher/smart";
import styles from "./CategoryResults.module.scss";

const CategoryResults = () => {
  const categories = ["여가", "운동", "학습", "개인", "업무"];

  const { posts, fetchPosts } = useSchedule();
  const user = useContext(UserContext);
  const [classificationResults, setClassificationResults] = useState<
    PostWithClassification[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPosts(user);
    }
  }, [fetchPosts, user]);
  const fetchAICategory = async () => {
    setIsLoading(true);
    try {
      const itemsToClassify = posts.map((post) => ({ text: post.title }));
      const response = await classify(itemsToClassify);
      const resultsWithId = response.map(
        (result: ClassificationResult, index: number) => ({
          ...result,
          id: posts[index].id,
        }),
      );
      setClassificationResults(resultsWithId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (posts.length > 0) {
      fetchAICategory();
    }
  }, [posts]);

  const handleReorder = useCallback(
    (category: string, reorderedItems: PostWithClassification[]) => {
      setClassificationResults((prevResults) => {
        const otherCategories = prevResults.filter(
          (item) => item.predicted_category !== category,
        );
        return [...otherCategories, ...reorderedItems];
      });
    },
    [],
  );
  const handleItemMove = useCallback(
    (itemId: string, targetCategory: string) => {
      setClassificationResults((prevResults) => {
        const updatedResults = prevResults.map((item) =>
          item.id === itemId
            ? { ...item, predicted_category: targetCategory }
            : item,
        );

        // 이동된 아이템 찾기
        const movedItem = updatedResults.find((item) => item.id === itemId);

        // 콘솔에 로그 출력
        if (movedItem) {
          console.log(
            `"${movedItem.text}" 아이템이 "${targetCategory}" 카테고리로 이동되었습니다.`,
          );
        }
        try {
          if (movedItem) {
            feedback(movedItem.text, targetCategory);
          }
        } catch (error) {
          console.error(error);
        }
        return updatedResults;
      });
    },
    [],
  );

  const renderItem = useCallback(
    (item: PostWithClassification) => (
      <Link href={`/schedule/${item.id}`} className={styles.link}>
        <p>
          <strong>{item.text}</strong>
        </p>
      </Link>
    ),
    [],
  );

  return (
    <div className={styles.container}>
      <h1>스마트 분류 (AI)</h1>
      <p className={styles.warning}>
        주의: 현재 AI 학습 자료가 충분하지 않아 분류 결과가 부정확할 수
        있습니다.
      </p>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.categoriesContainer}>
          {categories.map((category) => {
            const categoryResults = classificationResults.filter(
              (result) => result.predicted_category === category,
            );

            return (
              <div key={category} className={styles.categoryRow}>
                <h2>{category}</h2>
                <DragDropContainer
                  items={categoryResults}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  onReorder={(reorderedItems) =>
                    handleReorder(category, reorderedItems)
                  }
                  onItemMove={handleItemMove}
                  category={category}
                />
                {categoryResults.length === 0 && (
                  <div
                    className={styles.emptyCategory}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const itemId = e.dataTransfer.getData("text/plain");
                      handleItemMove(itemId, category);
                    }}
                  >
                    아이템을 여기에 드롭하세요
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryResults;
