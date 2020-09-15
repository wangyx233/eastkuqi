/*
 * @Since: 2020-09-15 16:05:21
 * @LastAuthor: Yixuan
 * @LastTime: 2020-09-15 22:57:33
 */
const data = {};

const getData = (building, high, roomInfo) => {
  let floor = [];
  for (let i = high; i > 0; i--) {
    let room = [];
    for (let id = 1; id <= roomInfo.count; id++) {
      room.push({
        id,
        price: {
          total: 0,
          unit: 5.8
        },
        area: 89,
        fringe: roomInfo.sp.includes(id)
      })
    }
    floor.push({
      layer: i,
      room
    })
  }
  data[building] = {
    high,
    floor
  }
}
getData(3, 4, {
  count: 5,
  sp: [5]
})
getData(4, 4, {
  count: 5,
  sp: [1]
})
getData(5, 7, {
  count: 7,
  sp: [1]
})
getData(2, 10, {
  count: 7,
  sp: [1]
})
getData(8, 9, {
  count: 6,
  sp: [1, 6]
})

export default data;