import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function BackgroundAnimation() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" }, resize: true },
          modes: { repulse: { distance: 100, duration: 0.4 } }
        },
        particles: {
          color: { value: "#facc15" },
          links: { color: "#facc15", distance: 150, enable: true, opacity: 0.4, width: 1 },
          collisions: { enable: false },
          move: { enable: true, speed: 1.4, outModes: { default: "bounce" } },
          number: { value: 40, density: { enable: true, area: 800 } },
          opacity: { value: 0.6 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 4 } }
        },
        detectRetina: true
      }}
    />
  );
}

export default BackgroundAnimation;
