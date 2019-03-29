var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    profession: "",
    race: "",
    level: "",
    file: null,
    description: "",
    addItem: null,
    items: [],
    findTitle: "",
    findItem: null,
    counter: 0,
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  },
  methods: {
   fileChanged(event) {
     this.file = event.target.files[0]
   },
   async upload() {
     try {
       const formData = new FormData();
       formData.append('photo', this.file, this.file.name)
       let r1 = await axios.post('/api/photos', formData);

       var name;
       if(this.title === "") {
         name = "NoName" + this.counter;
         this.counter++;
       }
       else {
         name = this.title;
       }

       let r2 = await axios.post('/api/items', {
         title: name,
         profession: this.profession,
         race: this.race,
         level: this.level,
         path: r1.data.path,
         description: this.description
       });
       this.addItem = r2.data;
     } catch (error) {
       console.log(error);
     }
   },
  async getItems() {
    try {
      let response = await axios.get("/api/items");
      this.items = response.data;
      return true;
    } catch (error) {
      console.log(error);
    }
  },
  selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
  },
  async deleteItem(item) {
      try {
        console.log(item._id);
        let response = axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
  },
  async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          profession: this.findItem.profession,
          race: this.findItem.race,
          level: this.findItem.level,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
 }
});
