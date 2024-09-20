import { useMemo, useState, Suspense, lazy } from "react";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import Loading from "@/components/Loading";
import { Post } from "@/types/schedule";
import { User } from "@/types/user";
import styles from "./MyPostList.module.scss";

const EditProfile = lazy(() => import("./EditProfile"));

const MyPostList = ({ posts, user }: { posts: Post[]; user: User }) => {
  const [isPriorityReverse, setIsPriorityReverse] = useState(false);
  const formatDate = (date: string) => {
    const parsedDate = parseISO(date);
    return format(parsedDate, "yyyy-MM-dd");
  };
  const sortedPosts = useMemo(() => {
    return posts
      .filter((post) => post.startDate)
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
  }, [posts]);
  const priority = ["low", "medium", "high"];
  const priorityPosts = useMemo(() => {
    const filtered = sortedPosts.filter((post) =>
      priority.includes(post.priority),
    );
    return isPriorityReverse
      ? filtered.sort(
          (a, b) => priority.indexOf(b.priority) - priority.indexOf(a.priority),
        )
      : filtered.sort(
          (a, b) => priority.indexOf(a.priority) - priority.indexOf(b.priority),
        );
  }, [sortedPosts, isPriorityReverse]);

  const handlePriority = () => {
    setIsPriorityReverse(!isPriorityReverse);
  };

  return (
    <Suspense fallback={<div>사용자 정보를 불러오는 중... </div>}>
      <div className={styles.myPostListContainer}>
        <h1 className={styles.myPostListTitle}>My Post List</h1>
        <button onClick={handlePriority} className={styles.myPostListButton}>
          {isPriorityReverse ? "중요도 낮은 순" : "중요도 높은 순"}
        </button>
        {priorityPosts.length === 0 ? (
          <p>작성한 글이 없습니다.</p>
        ) : (
          <div className={styles.myPostList}>
            {priorityPosts.map((post) => (
              <Link href={`/schedule/${post.id}`} key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.priority}</p>
                {post.startDate === post.endDate ? (
                  <p>{formatDate(post.startDate)}</p>
                ) : (
                  <p>
                    {formatDate(post.startDate)} ~ {formatDate(post.endDate)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
        <EditProfile user={user} />
      </div>
    </Suspense>
  );
};

export default MyPostList;
