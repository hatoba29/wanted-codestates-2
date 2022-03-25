import React, { MouseEvent, useEffect, useState } from "react"
import styled from "@emotion/styled"
import useAreValid from "~/hooks/useAreValid"

const Comment = ({ data }: { data: string }) => {
  const [nick, setNick] = useState("")
  const [comment, setComment] = useState("")
  const [commentList, setCommentList] = useState<[string, string][]>([])
  const areValid = useAreValid(nick, comment)

  // reset comment list when user changed
  useEffect(() => setCommentList([]), [data])

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCommentList((prev) => [...prev, [nick, comment]])
    setNick("")
    setComment("")
  }

  const renderComments = () =>
    commentList.map((c) => (
      <CommentItem key={c.toString()}>
        <span className="blue nick">{c[0]}</span>
        <span className="comment">{c[1]}</span>
      </CommentItem>
    ))

  return (
    <Wrapper>
      <Title>
        <span className="blue">응원</span> 한마디
        <span className="data">
          오늘 {commentList.length}개 전체 {commentList.length}개
        </span>
      </Title>
      <Comments>{renderComments()}</Comments>
      <Footer>
        <NickInput
          placeholder="닉네임"
          value={nick}
          onChange={(e) => setNick(e.currentTarget.value)}
          maxLength={5}
        />
        <CommentInput
          placeholder="최대 30자"
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          maxLength={30}
        />
        <SubmitBtn disabled={!areValid} onClick={handleSubmit}>
          남기기
        </SubmitBtn>
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 100%;
  height: 100%;
  border: 1px solid #f2f2f2;
  padding: 0 20px;
  background-color: white;

  display: flex;
  flex-direction: column;

  .blue {
    color: #0077ff;
  }
`

const Title = styled.header`
  height: 40px;
  border-bottom: 1px solid #ccc;

  font-size: 14px;
  line-height: 40px;

  .data {
    float: right;
    font-size: 12px;
    letter-spacing: -1px;
  }
`

const Comments = styled.ul`
  margin: 0;
  padding: 0;
  flex-grow: 1;
`

const CommentItem = styled.li`
  min-height: 40px;
  margin: 8px 0;

  list-style: none;
  display: flex;
  align-items: center;

  font-size: 12px;

  .nick {
    min-width: fit-content;
  }

  .comment {
    display: inline-block;
    min-height: 40px;
    margin-left: 12px;
    border: 1px solid #ccc;
    border-radius: 16px;
    padding: 0 8px;

    flex-grow: 1;
    display: grid;
    align-items: center;
  }
`

const Footer = styled.form`
  height: 48px;
  border-top: 1px solid #f2f2f2;
  padding: 8px 0;

  font-size: 14px;
  line-height: 48px;

  display: flex;
  align-items: center;

  .mode {
    float: right;
    font-size: 20px;
    font-weight: bold;
  }
`

const NickInput = styled.input`
  width: 66px;
  height: 100%;
  border: none;
  border-bottom: 1px solid #ccc;

  font-size: 12px;

  ::placeholder {
    color: #ccc;
  }
`

const CommentInput = styled(NickInput)`
  margin: 0 4px;
  flex-grow: 1;
`

const SubmitBtn = styled.button`
  width: 54px;
  height: 100%;
  border: 1px solid #0077ff;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;

  color: #0077ff;

  :hover {
    background-color: #0077ff;
    color: white;
  }
  :disabled {
    border: 1px solid #ccc;
    cursor: default;
    background-color: #ccc;
    color: white;
  }
`

export default Comment
