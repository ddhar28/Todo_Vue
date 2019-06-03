Vue.component('todo-item', {

  props: ['name'],

  template: `
  <li v-model="state" class="active">
  <input type="text" class="noEdit" disabled="true" :value="name">
  <button class="delete">Del</button>
  <button class="complete" @click="completeTask()">Comp</button>
  <button class="addNote">Note</button>
  <button class="edit">Edit</button>
  </li>
  `
})

let header = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

let input = new Vue({
  el: '#input',
  data: {
    name: ''
  },
  methods: {
    addTask: async function () {
      const task = { taskname: this.name, state: 'active', note: null }
      const res = await fetch('/add', {
        method: 'POST',
        headers: header,
        body: JSON.stringify(task)
      })
      let id = await res.json()
      id = id.task_id
      task['task_id'] = id
      list.todoItem.unshift(task)
      // console.log(list.todoItem)
      this.name = ''
    }
  }
})

let list = new Vue({
  el: '#taskList',

  data: {
    todoItem: {}
  },

  mounted () {
    this.getTask()
  },

  methods: {
    getTask: async function () {
      const result = await fetch('/getTasks', {
        method: 'GET',
        Headers: header
      })
      const tasks = await result.json()
      // console.log(tasks)
      this.todoItem = tasks
      console.log(this.todoItem)
    }
  }
})
