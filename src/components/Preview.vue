<!--
 * @Since: 2020-09-14 20:17:22
 * @LastAuthor: Yixuan
 * @LastTime: 2020-10-09 15:03:15
-->
<template>
  <div>
    <div class="container">
      <img src="../assets/preview.png" />
      <div class="side">
        <div>
          <span
            v-for="item in buildings"
            :key="item.key"
            @click="clickBuilding(item)"
            :class="{ active: item.key === current.key }"
            >{{ item.key }}号楼</span
          >
          <button @click="show()">查看已选房源</button>
        </div>
        <Building :data="current" :max="maxOrder" />
      </div>
    </div>
    <div v-if="showSelected" class="selected">
      <button @click="hide()">收起已选房源</button>
      <Selected :data="selectData" />
    </div>
  </div>
</template>

<script>
import data from "../assets/data.js";
import Building from "./Building.vue";
import Selected from "./Selected.vue";

const buildings = Object.keys(data).map((elem) => ({
  key: elem,
  value: {
    ...data[elem],
  },
}));
let current = {
  ...buildings[2],
};
let selectData = [];
let maxOrder = 0;

export default {
  name: "Preview",
  components: {
    Building,
    Selected,
  },
  data() {
    return {
      buildings,
      current,
      showSelected: false,
      selectData,
      maxOrder,
    };
  },
  methods: {
    clickBuilding: function (item) {
      this.current = { ...item };
      let max = 0;
      this.buildings.forEach((build) => {
        build.value.floor.forEach((elem) => {
          elem.room.forEach((r) => {
            if (r.selected) {
              max = Math.max(max, r.order);
            }
          });
          this.maxOrder = max;
        });
      });
    },
    show: function () {
      this.showSelected = true;
      let selectData = [];
      this.buildings.forEach((build) => {
        build.value.floor.forEach((elem) => {
          elem.room.forEach((r) => {
            if (r.selected) {
              selectData.push({
                id: `${build.key}-${elem.layer}-${r.id}`,
                symbol: {
                  build: build.key,
                  layer: elem.layer,
                  room: r.id,
                  kind: r.fringe ? "边户" : "中间",
                },
                r,
              });
            }
          });
          selectData.concat(elem.room.filter((r) => r.selected));
        });
      });
      this.selectData = selectData.sort((a, b) => a.r.order - b.r.order);
    },
    hide: function () {
      this.showSelected = false;
      this.selectData = [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  align-items: center;
  padding: 16px;
  min-height: calc(100vh - 32px);
}
.container > img {
  width: 50%;
}
.side {
  margin-left: 16px;
  text-align: left;
  display: inline-flex;
  flex-direction: column;
  flex-grow: 1;
}
.side :first-child > span {
  margin-right: 16px;
  cursor: pointer;
}
.side :first-child > span:hover {
  color: lightseagreen;
}
.active {
  color: lightseagreen;
}
button {
  border: 0;
  cursor: pointer;
  background-color: #1e9fff;
  border-radius: 3px;
  height: 28px;
  color: #fff;
}
.selected {
  padding: 16px;
  text-align: left;
}
.selected > button {
  margin-bottom: 8px;
}
</style>
