var mongoose = require("mongoose");
var blogpostSchema = new mongoose.Schema({
  title: String,
  image: String,
  fulltext: String,
  timestamp: { type: Date, default: Date.now},
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Blogpost",blogpostSchema)
