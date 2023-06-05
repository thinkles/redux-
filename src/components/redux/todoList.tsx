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
import { postAdded, postUpdated } from "../../store/tool";
import React from "react";


const Cl = (props:any)=>{
  const {content} =props;
  return <div>{content}</div>
} 


const ReduxTest = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState("");

  const posts = useAppSelector((state) => state.tool);
  const post = useAppSelector((state) =>
    state.tool.find((post) => post.id === postId)
  );
  const testa = ["mike","john","wikker","fud"]
  useEffect(() => {
 
    if (post !== undefined) {
      setTitle(post?.title ?? "");
      setContent(post?.content ?? "");
    }
  }, [postId]);

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded(
          title,
          content,
        )
      );

      setTitle("");
      setContent("");
    }
  };

  const onPostClicked = (id: string) => {
    setPostId(id);
  };
  const onEditPostClicked = () => {
    dispatch(postUpdated({ id: postId, title, content }));
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
              <Space>
                <button type="button" onClick={onSavePostClicked}>
                  保存文章
                </button>
                <button type="button" onClick={onEditPostClicked}>
                  编辑文章
                </button>
              </Space>
            </form>
          </div>
          <div className="flex-item">
            <h2>发布页</h2>
            {posts.map((post) => (
              <article className="post-excerpt" key={post.id} style={{position:"relative"}}>
                <div style={{ position: "absolute",right:10 }}>
                  <Button type="link" onClick={() => onPostClicked(post.id)}>
                    编辑文章
                  </Button>
                </div>
                <h3>{post.title}</h3>
                <p>{post.date}</p>
                <p className="post-content">{post.content.substring(0, 100)}</p>
              </article>
            ))}
          </div>
          <div className="flex-item">
            {" "}
            <h2>详情页</h2>
            <Cl attr={testa} content={content}/>
          </div>
        </main>
      </Card>
    </>
  );
};

ReduxTest.whyDidYouRender = true
export default ReduxTest;
