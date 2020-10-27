<template>
    <div id="mur" class="mur">
        <NewPost></NewPost>
        <Post></Post>
    </div>
</template>


<script>

// import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import NewPost from "../components/NewPost";

export default {
    name: "mur",
    components: {
        Post,
        NewPost,
        }
}

</script>

<style>

</style>