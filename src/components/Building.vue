<!--
 * @Since: 2020-09-15 14:46:12
 * @LastAuthor: Yixuan
 * @LastTime: 2020-09-16 01:55:58
-->
<template>
  <div>
    <div class="tips">*总高*：{{data.value.high}}层，*房间号方向*：从西向东</div>
    <table border class="table">
      <thead>
        <th>楼层</th>
        <th>房间号</th>
      </thead>
      <tbody>
        <tr v-for="item in data.value.floor" :key="item.layer">
          <td>{{item.layer}}</td>
          <td class="room-line">
            <div
              class="room"
              v-for="room in item.room"
              :key="room.id"
              :class="{ selected: room.selected }"
            >
              <div>{{room.id}}</div>
              <div>{{room.fringe ? '边户':'中间'}}-{{room.price.total}}/{{room.price.unit}}</div>
              <div>
                <button class="btn-add" @click="add(room)">+</button>
                <button @click="remove(room)">-</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "Building",
  props: {
    data: Object,
    max: Number,
  },
  methods: {
    add: function (room) {
      let max = this.max;
      this.data.value.floor.forEach((elem) => {
        elem.room.forEach((r) => {
          if (r.selected) {
            max = Math.max(max, r.order);
          }
        });
      });
      room.order = max + 1;
      room.selected = true;
    },
    remove: function (room) {
      room.selected = false;
      delete room.order;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tips {
  color: grey;
  font-size: 14px;
  margin: 16px 0;
}
.table {
  width: 100%;
  text-align: center;
}
.room-line {
  text-align: left;
}
.room {
  display: inline-block;
  background-color: lightgray;
  margin: 4px;
  padding: 4px;
  font-size: 14px;
}
.btn-add {
  margin-right: 8px;
  background-color: lightskyblue;
}
button {
  border: 0;
  cursor: pointer;
}
.selected {
  background-color: lightpink;
}
</style>
