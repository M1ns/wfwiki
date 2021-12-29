<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="row" style="display: flex; align-items: center">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div class="text-h5" style="margin-left: 15px">弹射世界中文Wiki</div>
        </q-toolbar-title>

        <q-tabs align="center">
          <q-route-tab to="/character" label="人物" />
          <q-route-tab to="/weapon" label="武器" />
          <q-route-tab to="/party" label="编队" />
        </q-tabs>

        <q-space />

        <q-btn dense flat round icon="search" @click="toggleRightDrawer" />

        <q-btn color="white" dense flat round icon="menu">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Having fun</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Crazy for transitions</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Mind blown</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- 人物信息 -->
      <div v-if="dataType">
        <q-list>
          <q-btn
            absolute
            style="top: 15px; right: -17px; z-index: 2"
            round
            push
            color="white"
            text-color="blue"
            icon="autorenew"
            @click="switchImg"
          />
          <q-item>
            <q-img
              v-show="isBeforeAwake"
              src="~assets/before.png"
              loading="lazy"
              height="250px"
            />
            <q-img
              v-show="!isBeforeAwake"
              src="~assets/after.png"
              loading="lazy"
              height="250px"
            />
          </q-item>
          <q-separator spaced inset />
          <q-item>
            <q-item-section avatar>
              <q-avatar size="50px" rounded>
                <q-img :src="dataObj.icon" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="row" style="display: flex; align-items: center">
                <q-item-label class="text-h6">{{
                  dataObj.displayName
                }}</q-item-label>
                <template
                  v-for="(alias, index) in parseArr(dataObj.alias)"
                  :key="index"
                >
                  <q-chip
                    v-if="alias"
                    :label="alias"
                    dense
                    text-color="white"
                    :color="getColor(dataObj.property)"
                  />
                </template>
              </div>
              <q-item-label caption lines="2">{{ dataObj.name }}</q-item-label>
              <q-item-label caption lines="2">cv:{{ dataObj.cv }}</q-item-label>
            </q-item-section>
            <q-item-section
              side
              class="column"
              style="display: flex; align-items: center"
            >
              <q-btn
                id="favorBtn"
                round
                push
                dense
                color="white"
                text-color="red"
                icon="favorite_border"
                size="10px"
                @click="onFavorBtnClick(dataObj.id)"
              />
              <q-item-label>{{ dataObj.favor }}</q-item-label>
              <q-avatar size="20px" style="margin-top: 5px">
                <img v-if="dataObj.type == 1" src="~assets/pftype/fist.png" />
                <img v-if="dataObj.type == 2" src="~assets/pftype/shoot.png" />
                <img v-if="dataObj.type == 4" src="~assets/pftype/sword.png" />
              </q-avatar>
            </q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item>
            <q-item-section>
              <div>
                <q-btn
                  unelevated
                  rounded
                  dense
                  :color="getColor(dataObj.property)"
                  label="主动技能"
                  size="sm"
                />
                <q-btn
                  outline
                  rounded
                  dense
                  :color="getColor(dataObj.property)"
                  :label="dataObj.lbName"
                  size="sm"
                  style="margin-left: 5px"
                />
              </div>
              <q-item-label>{{ dataObj.lbData }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view @selectChara="setCharaData" v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
        >
          <keep-alive> <component :is="Component" /> </keep-alive>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    var isBeforeAwake = ref(true);
    var dataType = ref(true);
    var dataObj = ref({
      alias: "['火龙']",
      atk: 888,
      cv: "武内骏辅",
      displayName: "獄炎の龍王",
      effectTag: "['自充']",
      enableBoard: 0,
      energy: 550,
      favor: 0,
      fsId: "recTsq65w4",
      fsName: "ヴァーグナー|瓦格纳 (火龙)",
      fsVersion: "26b5609ad8f24967b73011a9247e5414",
      gender: 1,
      hp: 4233,
      iPassive: "强化弹射伤害+ 30 %",
      icon: "img/13f9c1e7-8d64-4e39-8977-17bf50dcd8eb.png",
      id: 17,
      iiPassive: "5 次强化弹射时、自身攻击力+ 15 %[最大+ 90 %]",
      iiiPassive:
        "以主要角色编成：强化弹射Lv3必要COMBO - 5 ＆ 强化弹射伤害+ 40 %",
      introduceBriefly:
        "人よりも多くの時を生き、多くの言葉を知る古き龍。人間を低く見る傾向もあるが、かつて死闘を演じた勇者ライトには執着を見せる",
      ivPassive: "战斗开始时，自身技能槽+ 50%",
      lb: "喷射火焰、对前方敌人造成火伤害",
      lbData: "最大攻击段数30，最大倍率27",
      lbName: "プロミネンス・ブレス",
      leader: "火属性角色攻击力+ 100 %/ 强化弹射伤害+ 70 %",
      leaderName: "火龍の風格",
      name: "瓦格纳[ヴァーグナー]",
      property: 0,
      race: "龙",
      rarity: 5,
      showOrder: 0,
      systemTag: "['PF','踢罐']",
      type: 2,
      updateTime: "2021-12-27 14:23:24",
      vPassive:
        "Power Flip(强化弹射)LV3必要Combo - 2 & Power FLip(强化弹射)LV3伤害+ 5%",
      viPassive:
        "Power Flip(强化弹射)LV3发动时，Power Flip(强化弹射)伤害+ 8%[最大+ 40%]",
      way: "常驻池",
    });

    var favorClicked = ref(false);

    return {
      leftDrawerOpen,
      rightDrawerOpen,
      dataType,
      dataObj,
      isBeforeAwake,
      favorClicked,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },

      switchImg() {
        isBeforeAwake.value = !isBeforeAwake.value;
      },

      setCharaData(charaDataObj) {
        // console.log(dataType);
        dataType.value = true;
        dataObj.value = charaDataObj;
        console.log(dataObj);
      },

      parseArr(str) {
        let str_a = str.slice(1, str.length - 1);
        // console.log(str_a);
        let arr_a = str_a.split(",");
        let arr_b = [];
        arr_a.forEach((element) => {
          let str_b = element.slice(1, element.length - 1);
          arr_b.push(str_b);
        });
        // console.log(arr);
        return arr_b;
      },
      getColor(attribute) {
        switch (attribute) {
          case 0:
            return "red-5";
          case 1:
            return "blue-5";
          case 2:
            return "yellow-5";
          case 3:
            return "green-5";
          case 4:
            return "grey-8";
          case 5:
            return "indigo-10";

          default:
            break;
        }
      },
      onFavorBtnClick(id) {
        let btn = document.getElementById("favorBtn");
        let icon = btn.children[1].children[0];
        if (!favorClicked.value) {
          dataObj.value.favor++;
          console.log(id); //todo 上传点赞数据
          favorClicked.value = true;
          icon.innerHTML = "favorite";
        } else {
          dataObj.value.favor--;
          console.log(id); //todo 上传点赞数据
          favorClicked.value = false;
          icon.innerHTML = "favorite_border";
        }
      },
    };
  },
  watch: {
    $route(to, from) {
      this.transition;
    },
  },
});
</script>
