<!--
 * @Since: 2020-09-15 16:59:43
 * @LastAuthor: Yixuan
 * @LastTime: 2020-09-15 20:01:57
-->
<template>
  <div>
    <table border class="table">
      <thead>
        <th>序号</th>
        <th>房间号</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in current" :key="item.id">
          <td>{{index + 1}}</td>
          <td>{{item.symbol.build}}号楼-{{item.symbol.layer}}层-{{item.symbol.room}}</td>
          <td>
            <button @click="up(index)" v-if="index !== 0">上移</button>
            <button @click="down(index)" v-if="index !== current.length - 1">下移</button>
            <button @click="remove(item)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="download">
      <button @click="download()">下载表格</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Selected",
  props: ["data"],
  data() {
    return {
      current: this.data,
    };
  },
  watch: {
    data(val) {
      this.current = val;
    },
  },
  methods: {
    up: function (index) {
      [this.current[index - 1], this.current[index]] = [
        this.current[index],
        this.current[index - 1],
      ];
    },
    down: function (index) {
      [this.current[index], this.current[index + 1]] = [
        this.current[index + 1],
        this.current[index],
      ];
    },
    remove: function (item) {
      item.r.selected = false;
      this.current = this.current.filter((elem) => elem.r.selected);
    },
    download: function () {
      let data = [["序号", "房间号"]];
      this.current.forEach((elem, index) => {
        data.push([
          index + 1,
          `${elem.symbol.build}号楼-${elem.symbol.layer}层-${elem.symbol.room}`,
        ]);
      });
      let content = "";
      data.forEach((elem) => (content += '"' + elem.join('","') + '"\r\n'));
      // 创建隐藏的可下载链接
      var eleLink = document.createElement("a");
      eleLink.download = "房源排行.csv";
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      var blob = new Blob([`\uFEFF${content}`]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  width: 100%;
  text-align: center;
}

button {
  border: 0;
  cursor: pointer;
  margin-right: 8px;
  background-color: lightskyblue;
  border-radius: 2px;
  color: #fff;
}
.download {
  text-align: center;
  margin: 16px 0;
}
.download > button {
  height: 30px;
  background-color: lightseagreen;
  border-radius: 3px;
}
</style>