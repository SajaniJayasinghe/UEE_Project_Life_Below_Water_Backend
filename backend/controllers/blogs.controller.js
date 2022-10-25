const Blogs = require("../models/blogs.models");

const NewBlog = async (req, res) => {
    let newBlog = new Blogs(req.body);
    newBlog.save((err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).send({ blog: newBlog }).json({
        success: "New Blog add successfully!!!",
      });
    });
  };
  
  const GetBlog = async (req, res) => {
    Blogs.find().exec((err, blogs) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingBlogs: blogs,
      });
    });
  };

  const GetOneBlog = async (req, res) => {
    let BlogID = req.params.BlogID;
    Blogs.findById(BlogID, (err, blog) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingBlogs: blog,
      });
    });
  };
    
  const UpdateBlog = (req, res) => {
    Blogs.findByIdAndUpdate(
      req.params.blogID,
      {
        $set: req.body,
      },
      (err) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        return res.status(200).json({
          success: "Updated Successfully",
        });
      }
    );
  };

  const DeleteBlog = (req, res) => {
    Blogs.findByIdAndRemove(req.params.blogID).exec(
      (err, deleteblogs) => {
        if (err)
          return res.status(400).json({
            message: "Deletion Unsuccessfull",
            err,
          });
  
        return res.json({
          message: "Deletion Successfull",
          deleteblogs,
        });
      }
    );
  };

  module.exports = {
    NewBlog,
    GetBlog,
    GetOneBlog,
    UpdateBlog,
    DeleteBlog,
  };
  