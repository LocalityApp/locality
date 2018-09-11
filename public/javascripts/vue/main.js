var Vue = require('vue/dist/vue.js');

Vue.component('slickSort', require('./components/cruelWorld.vue'));

const vueComponent = new Vue({
	el: '#root',
	render: (h) => h(ExampleVue),
});