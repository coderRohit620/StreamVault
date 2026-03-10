require("dotenv").config();
const express = require("express");
// import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

//
const githubData = {
    login: "coderRohit620",
    id: 123576106,
    node_id: "U_kgDOB12fKg",
    avatar_url: "https://avatars.githubusercontent.com/u/123576106?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/coderRohit620",
    html_url: "https://github.com/coderRohit620",
    followers_url: "https://api.github.com/users/coderRohit620/followers",
    following_url:
        "https://api.github.com/users/coderRohit620/following{/other_user}",
    gists_url: "https://api.github.com/users/coderRohit620/gists{/gist_id}",
    starred_url:
        "https://api.github.com/users/coderRohit620/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/coderRohit620/subscriptions",
    organizations_url: "https://api.github.com/users/coderRohit620/orgs",
    repos_url: "https://api.github.com/users/coderRohit620/repos",
    events_url: "https://api.github.com/users/coderRohit620/events{/privacy}",
    received_events_url:
        "https://api.github.com/users/coderRohit620/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
    name: "Rohit Ravi",
    company: null,
    blog: "",
    location: null,
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 21,
    public_gists: 0,
    followers: 3,
    following: 4,
    created_at: "2023-01-25T16:05:25Z",
    updated_at: "2026-03-03T18:10:45Z",
};

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/twitter", (req, res) => {
    res.send("Rohit-Twitter-Acount");
});

app.get("/login", (req, res) => {
    res.send("<h1>please login at chai aur code</h1>");
});

app.get("/youtube", (req, res) => {
    res.send("<h2>Chai aur Code</h2>");
});


app.get("/github", (req, res) => {
    res.json(githubData);
})

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
