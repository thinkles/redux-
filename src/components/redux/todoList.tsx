import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import "./style.css";
import {
  Button,
  Card,
  Input,
  List,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "../../store/tool";

const ReduxTest = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.tool);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
        })
      );

      setTitle("");
      setContent("");
    }
  };

  return (
    <>
      <Card title={"redux-toolkit 使用"}>
        <main style={{ display: "flex", height: "80vh" }}>
          <div className="flex-item">
            <h2>新增页</h2>
            <form>
              <label htmlFor="postTitle">文章标题:</label>
              <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged}
              />
              <label htmlFor="postContent">内容：</label>
              <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
              />
              <button type="button" onClick={onSavePostClicked}>
                保存文章
              </button>
            </form>
          </div>
          <div className="flex-item">
            <h2>发布页</h2>
            {posts.map((post) => (
              <article className="post-excerpt" key={post.id}>
                <h3>{post.title}</h3>
                <p className="post-content">{post.content.substring(0, 100)}</p>
              </article>
            ))}
          </div>
          <div className="flex-item">
            {" "}
            <h2>详情页</h2>
          </div>
        </main>
      </Card>
    </>
  );
};

export default ReduxTest;
