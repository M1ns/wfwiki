<template>
  <q-page class="flex flex-start q-pa-md non-selectable">
    <div
      class="column justify-start q-gutter-sm"
      style="min-width: 100%; min-height: 100%"
    >
      <div class="row" style="min-width: 100%; min-height: 14px;display: flex; align-items: center">
        <q-img
          src="~assets/star/nonbackground/5.png"
          style="max-width: 80px; max-height: 14px"
        />
      </div>
      <div class="row">
        <div
          class="q-pa-xs"
          v-for="(chara, index) in roleData.fiveStar"
          :key="index"
        >
          <q-avatar rounded @click="select(index,'fiveStar')">
            <!-- <q-skeleton :id="chara.id" size="50px" /> -->
            <!-- <img :src="chara.icon" @onload="avatarOnload(chara.id)" /> -->
            <q-img :src="chara.icon" spinner-color="primary"/>
          </q-avatar>
        </div>
      </div>
      <q-separator />

      <div class="row" style="min-width: 100%; min-height: 14px">
        <q-img
          src="~assets/star/nonbackground/4.png"
          style="max-width: 80px; max-height: 14px"
        />
      </div>
      <div class="row"></div>
      <q-separator />

      <div class="row" style="min-width: 100%; min-height: 14px">
        <q-img
          src="~assets/star/nonbackground/3.png"
          style="max-width: 80px; max-height: 14px"
        />
      </div>
      <div class="row"></div>
      <q-separator />

      <div class="row" style="min-width: 100%; min-height: 14px">
        <q-img
          src="~assets/star/nonbackground/2.png"
          style="max-width: 80px; max-height: 14px"
        />
      </div>
      <div class="row"></div>
      <q-separator />

      <div class="row" style="min-width: 100%; min-height: 14px">
        <q-img
          src="~assets/star/nonbackground/1.png"
          style="max-width: 80px; max-height: 14px"
        />
      </div>
      <div class="row"></div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";

export default defineComponent({
  name: "PageIndex",
  setup() {
    var roleData = ref({
      fiveStar: [],
      fourStar: [],
      threeStar: [],
      twoStar: [],
      oneStar: [],
    });
    var filter = ref({
      rarity: [1, 2, 3, 4, 5], //星级
      gender: [0, 1, 2, 3], //性别
      attribute: [0, 1, 2, 3, 4, 5, 6], //属性
      race: [], //种族
      pfType: [0, 1, 2, 3, 4], //pf类型
    });
    var sort = ref(0);
    var sortDirection = ref(true);
    var imgsrc = ref({
      star: {
        1: "~assets/star/nonbackground/1.png",
        2: "~assets/star/nonbackground/2.png",
        3: "~assets/star/nonbackground/3.png",
        4: "~assets/star/nonbackground/4.png",
        5: "~assets/star/nonbackground/5.png",
      },
    });
    return {
      roleData,
      filter,
      sort,
      sortDirection,
      imgsrc,

      avatarOnload(charaId) {
        console.log(charaId);
        let skeleton = document.getElementById(charaId);
        if (skeleton != null) {
          console.log("success");
          skeleton.parentNode.removeChild(skeleton);
        } else {
          console.log("failed");
        }
      },
      select(index,star){
        let charaObj=this.roleData[star][index]
        this.$emit('selectChara',charaObj)
      }
    };
  },
  mounted: function () {
    this.$api({
      method: "post",
      url: "character/list",
    })
      .then((res) => {
        let roleData = res.data.data;
        roleData.map((item) => {
          let star = item.rarity;
          switch (star) {
            case 5:
              this.roleData.fiveStar.push(item);
              break;
            case 4:
              this.roleData.fourStar.push(item);
              break;
            case 3:
              this.roleData.threeStar.push(item);
              break;
            case 2:
              this.roleData.twoStar.push(item);
              break;
            case 1:
              this.roleData.oneStar.push(item);
              break;
          }
        });

        console.log(this.roleData);
      })
      .catch((e) => console.log(e));
  },
  methods: {},
  watch: {},
});
</script>

<style lang="stylus"></style>
