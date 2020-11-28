<template>
<div id="app">
  <header id="header">
    <div class="stuff">
    <router-link to="/"><h1>Nu-Wave Music</h1></router-link>
    <div>
      <router-link to="/"><i class="fas fa-music"></i></router-link>
      <router-link to="/dashboard"><i class="fas fa-user"></i></router-link>
    </div>
  </div>
  </header>
  <div id="wave">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width="100%" preserveAspectRatio="none"><path fill="#6f2232" fill-opacity="1" d="M0,0L60,26.7C120,53,240,107,360,138.7C480,171,600,181,720,160C840,139,960,85,1080,69.3C1200,53,1320,75,1380,85.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
  </div>
  <div id="content">
    <router-view />
  </div>
  <div id="footer">
    <a href="https://github.com/carterhague/creative_wave">GitHub Repo Link :)</a>
  </div>
</div>
</template>

<style>

body {
  font-family: 'Source Code Pro', monospace;
  font-weight: 300;
  font-size: 13pt;
  background: #282828;
  width:100%;
  height:100;
  min-width: fit-content;
}

.stuff {
  display: flex;
  justify-content: space-between;
  padding: 0 30px 0 30px;
}

#header {
  position: relative;
  width: 100%;
  height: 2.4rem;
  padding: 15px 0px 10px 0px;
  background: #6f2232;
  font-size: 14px;
}

svg {
  width: 100%;
  height: 50px;
}

h1 {
  color: #fff;
  font-size: 18px;
}

h2 {
  font-size: 12px;
}

#header .fas {
  font-size: 25px;
  color: #eee;
  width: 50px;
}

.pure-button-primary {
  background-color: #277E8E;
}

#content {
  margin: 0 200px;
  color: #eee;
  margin: 0 200px;
}

/* Footer */
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  display: flex;
  justify-content: space-between;
  height: 2.4rem;
  padding: 20px 100px 0px 100px;
  background: #181818;
  font-size: 12px;
}

#footer a {
  color: #eee;
}

#wave {
  width: 100%;
  height: 5vh;
}

a {
    text-decoration: none;
}
</style>
