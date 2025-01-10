<template>
  <div class="landing">
    <div class="content">
      <img
        src="../assets/images/pokemon-logo.png"
        alt="Pokemon Logo"
        class="logo"
      />
      
      <div class="welcome-text">
        <h1>Welcome to the Pokemon World</h1>
        <p>Discover and explore amazing pokemons!</p>
      </div>

      <div class="features">
        <div class="feature">
          <span class="icon">🔍</span>
          <h3>Search</h3>
          <p>Find your favorite pokemons</p>
        </div>
        <div class="feature">
          <span class="icon">📊</span>
          <h3>Stats</h3>
          <p>View detailed statistics</p>
        </div>
      </div>

      <router-link to="/home" class="enter-button">
        <span class="button_top">Enter Now!</span>
      </router-link>

      <div class="decorative-pokeballs">
        <img
          v-for="n in 3"
          :key="n"
          src="../assets/images/pokeball.png"
          :class="['pokeball', `pokeball-${n}`]"
          alt="Pokeball"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
.landing {
  min-height: 100vh;
  background: linear-gradient(135deg, #ef5350 0%, #f78fb3 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  font-family: "VT323", monospace;
}

.content {
  text-align: center;
  color: white;
  max-width: 800px;
  z-index: 1;
}

.logo {
  width: 80%;
  max-width: 400px;
  margin-bottom: 30px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));
}

.welcome-text {
  margin-bottom: 40px;
}

.welcome-text h1 {
  font-size: 3em;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.welcome-text p {
  font-size: 1.5em;
  margin: 10px 0;
  opacity: 0.9;
}

.features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.feature {
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 2em;
  margin-bottom: 10px;
  display: block;
}

.feature h3 {
  margin: 0;
  font-size: 1.5em;
}

.feature p {
  margin: 5px 0 0;
  opacity: 0.9;
}

.enter-button {
  display: inline-block;
  text-decoration: none;
  margin-top: 20px;
}

.button_top {
  display: block;
  padding: 15px 40px;
  border-radius: 30px;
  background: white;
  color: #ef5350;
  font-size: 1.5em;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.enter-button:hover .button_top {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.decorative-pokeballs {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.pokeball {
  position: absolute;
  width: 100px;
  opacity: 0.1;
}

.pokeball-1 {
  top: 10%;
  left: 10%;
  animation: float 6s ease-in-out infinite;
}

.pokeball-2 {
  top: 60%;
  right: 15%;
  animation: float 8s ease-in-out infinite;
}

.pokeball-3 {
  bottom: 10%;
  left: 30%;
  animation: float 7s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .welcome-text h1 {
    font-size: 2.5em;
  }

  .welcome-text p {
    font-size: 1.2em;
  }

  .button_top {
    padding: 12px 30px;
    font-size: 1.3em;
  }

  .pokeball {
    width: 60px;
  }
}
</style> 