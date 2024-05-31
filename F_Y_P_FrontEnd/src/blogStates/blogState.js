import React, { useContext, useState } from 'react'
import BlogContext from './blogContext'
import baseUrl from '../url';

export default function BlogState(props) {
  const [allBlogs, setallBlogs] = useState([]);
  const [detailBlog, setdetailBlog] = useState({});
  const getAllBlogs = async () => {
    await fetch(`${baseUrl}blogs/getAllBlogs`).then(res => res.json()).then(response => {
      setallBlogs(response.result);
    })
  }
  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  };
  const getDetailedBlog = async (id) => {
    await fetch(`${baseUrl}blogs/getAllBlogs`).then(res => res.json()).then(response => {
      if(response.status){
        response.result.map((value)=>{
          if(value.blog_id == id){
            const subHeadings = value.sub_headings.map((value)=>{
              value.id = generateRandomString(10);
              return value;
            })
            value.sub_headings = subHeadings;
            setdetailBlog(value);
           
          }
        })
      }
    })
  }
  return (
    <BlogContext.Provider value={{getAllBlogs, allBlogs, setallBlogs, detailBlog, getDetailedBlog,setdetailBlog}}>
      {props.children}
    </BlogContext.Provider>
  )
}
