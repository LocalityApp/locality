const SortableList = {
	mixins: [ContainerMixin],
	template: `
	  <ul class="list">
		<slot />
	  </ul>
	`,
  };
  
  const SortableItem = {
	mixins: [ElementMixin],
	props: ['item'],
	template: `
	  <li class="list-item">{{item}}</li>
	`,
  };
  
  const ExampleVue = {
	name: 'Example',
	template: `
	  <div class="root">
		<SortableList lockAxis="y" v-model="items">
		  <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
		</SortableList>
	  </div>
	`,
	components: {
		SortableItem,
		SortableList,
	},
	data() {
		return {
			items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
	};
	},
  };
  
