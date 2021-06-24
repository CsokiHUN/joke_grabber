const App = Vue.createApp({
    data() {
        return {
            loading: true,
            title: '',
            typ: '',
            joke: ''
        }
    },
    methods: {
        async fetchJoke() {
            this.loading = true;
            const response = await fetch('http://localhost:8080/random');
            const joke = await response.json();

            this.title = joke.title;
            this.typ = joke.typ;
            this.joke = joke.text.replace(/\r\n/g, '<br>').replace(/[\r\n]/g, '<br>');
            this.loading = false;

            console.log(this.joke);
            return joke;
        }
    },
    created() {
        this.fetchJoke();
    }
})
    .mount('#app')