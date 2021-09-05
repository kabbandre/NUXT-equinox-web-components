<template>
  <div class="row">
    <div class="col col-xs-12 col-lg-3">
      <div class="sidebar-wrapper">
        <e-tabs :tabs="JSON.stringify(tabs)" @tabSelected="tabSelected" />
        <div class="sidebar">
          <div v-if="selectedTab.key === 'friends'">
            <e-card
              v-for="(friend, i) in friends"
              :key="i"
              :dark="isDark"
              :backdrop-blur="strength"
              :backdrop="silicon"
              style="width: 100%; margin-bottom: 10px;"
            >
              <div style="display: flex; padding: 8px; width: 100%; gap: 12px; align-items: center">
                <e-avatar>
                  <img :src="friend.img">
                </e-avatar>
                <div>
                  <div style="color: white; font-weight: bold; font-size: 16px">
                    {{ friend.name }}
                  </div>
                  <div style="color: white; font-size: 12px; margin-top: 4px">
                    {{ friend.lastMessage }}
                  </div>
                </div>
              </div>
            </e-card>
          </div>
          <div v-else-if="selectedTab.key === 'blocked'">
            <e-card
              v-for="(block, i) in blocked"
              :key="i"
              :dark="isDark"
              :backdrop-blur="strength"
              :backdrop="silicon"
              style="width: 100%; margin-bottom: 10px;"
            >
              <div style="display: flex; flex-wrap: nowrap; padding: 8px; width: 100%; gap: 12px; align-items: center">
                <e-avatar>
                  <img :src="block.img">
                </e-avatar>
                <div>
                  <div style="color: white; font-weight: bold; font-size: 16px">
                    {{ block.name }}
                  </div>
                  <div style="color: white; font-size: 12px; margin-top: 4px;">
                    Date: {{ block.date }}
                  </div>
                </div>
                <div style="margin-left: auto; margin-right: 18px;" @click="friends.push(...blocked.splice(i, 1))">
                  <e-btn size="sm" icon="ph-x-circle" />
                </div>
              </div>
            </e-card>
          </div>
          <div v-else-if="selectedTab.key === 'settings'">
            <e-card :dark="isDark" :backdrop-blur="strength" :backdrop="silicon" style="margin: auto">
              <div
                style="
              padding: 16px;
              width: 180px;
              display: flex;
              flex-direction: column;
              align-items: center;
            "
              >
                <e-avatar :text="name" size="xxl" />
                <div
                  style="
                display: flex;
                margin-top: 17px;
                margin-bottom: 9px;
                color: white
              "
                >
                  <e-icon style="margin-right: 12px;" icon="ph-eye" />
                  0
                </div>
                <div
                  style="
                color: var(--gray-400);
              "
                >
                  Yesterday
                </div>
                <div
                  style="
                color: var(--gray-400);
              "
                >
                  1:42 PM
                </div>
              </div>
            </e-card>
            <div style="background: white; border-radius: 30px; padding: 24px; margin-top: 20px">
              <div style="font-size: 24px; display: flex; align-items: center; gap: 12px; margin-bottom: 12px">
                <e-icon :color="isDark ? 'var(--primary)' : 'var(--gray-300)'" icon="ph-moon" />
                <e-checkbox
                  type="switch"
                  :value="mode"
                  false-value="dark"
                  true-value="light"
                  @valueChanged="e => mode = e.detail"
                />
                <e-icon :color="!isDark ? 'var(--primary)' : 'var(--gray-300)'" icon="ph-sun" />
              </div>
              <e-checkbox style="margin-bottom: 12px;" :value="silicon" @valueChanged="e => silicon = e.detail">
                Turn on Silicon style
              </e-checkbox>
              <label style="font-size: 12px;">
                Silicon style strength
                <e-radio-group :value="strength" @valueChanged="e => strength = e.detail">
                  <e-radio value="weak" style="margin-top: 6px">
                    Weak
                  </e-radio>
                  <e-radio value="medium" style="margin-top: 12px">
                    Medium
                  </e-radio>
                  <e-radio value="strong" style="margin-top: 12px">
                    Strong
                  </e-radio>
                </e-radio-group>
              </label>
              <div style="margin-top: 12px">
                <label style="font-size: 12px">
                  Your name
                  <e-input prepend-icon="ph-smiley" placeholder="Your name" :value="name" @valueChanged="e => name = e.detail" />
                </label>
              </div>
              <e-collapse style="margin-top: 20px" header-title="Information about this website">
                This website was created in order to show the capabilities of <b>Equinox UI library</b>, which is made using
                <b><i>Stencil framework</i></b>. It was created by <b>Mihails Jeremejevs</b>.
                <br><br><strong>This project is NOT associated with Equinox design original author.</strong>
                <br><br>
                <a href="https://github.com/kabbandre/Equinox-Web-Components" target="_blank">GitHub</a>
                <a href="https://equinox.kabba.me">Storybook</a>
              </e-collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-xs-12 col-lg-9">
      <div class="chat-wrapper">
        <div class="chats">
          <e-card
            v-for="(message, i) in messages"
            :key="i"
            :class="`hydrated chat-${message.align}`"
            :dark="isDark"
            :backdrop-blur="strength"
            :backdrop="silicon"
          >
            <div class="chat-message">
              <div class="chat-message__text">
                {{ message.text }}
              </div>
              <div class="chat-message__sender">
                {{ message.sender }}
              </div>
            </div>
          </e-card>
        </div>
        <div class="chat-box">
          <e-chat-box :dark="isDark" :backdrop-blur="strength" :backdrop="silicon" />
        </div>
      </div>
    </div>
    <div class="silicon-dark-strong" style="position: absolute; bottom: 0; left: 0; border-radius: 20px; margin: 8px; padding: 8px 12px; color: white;">
      Images are provided by <a style="color: white;" href="https://picsum.photos/">Lorem Picsum</a>.
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [{ key: 'friends', title: 'Friends' }, { key: 'blocked', title: 'Blocked' }, { key: 'settings', title: 'Settings' }],
      selectedTab: {},
      silicon: true,
      strength: 'medium',
      mode: 'dark',
      name: 'Mihails Jeremejevs',
      friends: [
        { img: 'https://picsum.photos/100', name: 'Rolands Gobzems', lastMessage: 'Nunc a nisi eget justo sollicitudin scelerisque. Aliquam...' },
        { img: 'https://picsum.photos/100', name: 'Nikita Malkovs', lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite...' },
        { img: 'https://picsum.photos/100', name: 'Aleksandrs Rosļakov', lastMessage: 'Integer in metus eget lorem sodales facilisis vitae non...' },
        { img: 'https://picsum.photos/100', name: 'John Doe', lastMessage: 'Nulla vel porttitor turpis. Aenean consequat justo et dui...' },
        { img: 'https://picsum.photos/100', name: 'Mary Jane', lastMessage: 'Praesent fermentum posuere metus, vitae ultricies risus eu...' }
      ],
      blocked: [
        { img: 'https://picsum.photos/100', name: 'Angie Hayes', date: '03/12/2020' },
        { img: 'https://picsum.photos/100', name: 'Barack Pence', date: '31/12/2019' },
        { img: 'https://picsum.photos/100', name: 'Kristaps Baženovs', date: '21/04/2017' }
      ]
    }
  },
  computed: {
    isDark () {
      return this.mode === 'dark'
    },
    messages () {
      return [
        { sender: 'Aldis Zatlers', text: 'Nunc a nisi eget justo sollicitudin scelerisque.', align: 'left' },
        { sender: 'Marina Zuka', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite.', align: 'left' },
        { sender: this.name, text: 'Integer in metus eget lorem sodales facilisis vitae non.', align: 'right' },
        { sender: this.name, text: 'Nulla vel porttitor turpis. Aenean consequat justo et dui.', align: 'right' },
        { sender: 'Marina Zuka', text: 'Praesent fermentum posuere metus, vitae ultricies risus eu.', align: 'left' }
      ]
    }
  },
  methods: {
    tabSelected (e) {
      this.selectedTab = e.detail
    },
    input (e) {
      console.log(e)
    }
  }
}
</script>

<style>
body {
  font-family: Roboto;
  margin: 0;
  width: 100vw;
  overflow: hidden;
  background: url("https://picsum.photos/1920/1080");
}
.row {
  height: 100vh;
  padding: 0
}
.col {
  padding: 0
}
.sidebar-wrapper {
  padding: 24px;
}
.sidebar {
  padding: 24px 0
}
.chat-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.chats {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
.chat-message {
  padding: 12px;
}
.chat-message__text {
  color: white
}
.chat-message__sender {
  color: white;
  font-size: 14px;
  font-weight: bold;
}
.chat-left {
  margin-right: auto
}
.chat-right {
  margin-left: auto;
}
.chat-box {
  padding: 12px;
}
</style>
