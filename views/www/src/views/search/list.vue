<template lang="pug">
    .search-list
        header.search-header
            form.search-header-form(@submit.prevent="handleSearchSubmit")
                input(type="text" placeholder="Search article" v-model="query.search")
                a.btn.btn-search(@click="handleSearchSubmit")
                    .icon.icon-search
        .post-lists(v-if="!loading")
            section(v-for="post in posts")
                .post-lists__meta--top
                    .post-lists__number p{{post.id}}
                    h2.post-lists__title
                        router-link(:to="'/detail/' + post.id") {{post.title}}
                .post-lists__content.article
                    figure.images(v-if="post.images.length")
                        router-link.btn(:to="'/detail/' + post.id")
                            img(v-for="image in post.images" v-bind:src="image.url + '?imageView2/1/w/1000/h/600'")
                    .content(v-html="post.excerpt" v-if="post.excerpt")
                .post-lists__meta--bottom
                    p.more
                        router-link(:to="'/detail/' + post.id") Read More
                    p
                        like-counter(v-bind:id="post.id" v-model="post.like_count")
        loading(v-else)
</template>

<script>
    import { fetchPostLists } from '../../models/posts';

    export default {
        name: 'searchList',
        data() {
            return {
                query: {
                    page: 1,
                    per_page: 100,
                    search: '',
                    order_by: 'release_at'
                },
                posts: [],
                loading: false
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            load() {
                const { type } = this.$route.params;

                this.query.search = type;

                return fetchPostLists(this.query).then(res => res.data);
            },
            init() {
                this.loading = true;
                this.load().then(data => {
                    this.posts = data;
                    this.loading = false;
                });
            },
            handleSearchSubmit() {
                const { search } = this.query;

                if (search.trim()) {
                    this.$router.push({ path: `/search/${search.trim()}` });
                }
            }
        },
        watch: {
            $route: 'init'
        }
    };
</script>

<style lang="scss">
    @import "./list.scss";
</style>