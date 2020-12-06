<template>
  <div class="three_wrapper">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import {
  useRenderer,
  useScene,
  useStats,
  useResize,
  useOrbitControls
} from '../hook/useRenderer'

let renderer, scene, camera, controls, stats
export default defineComponent({
  setup () {
    onMounted(() => {
      renderer = useRenderer('canvas')
      scene = useScene()
      stats = useStats()
      initCamera()
      initLight()
      initSceneHelp()
      initGeometry()

      controls = useOrbitControls(camera, renderer.domElement)
      controls.enableDamping = true

      animate()
      window.addEventListener('resize', resize, false)
      controls.addEventListener('change', animate)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resize, false)
    })

    const initGeometry = () => {
      const material = new THREE.MeshNormalMaterial({
        wireframe: false, // 关闭线框显示
        side: THREE.DoubleSide //  双面显示
      })

      // 创建正方体
      const box = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), material)
      scene.add(box)

      // 创建圆片(半径，分段数)
      const circle = new THREE.Mesh(new THREE.CircleGeometry(10, 40), material)
      circle.position.set(40, 0, 0)
      scene.add(circle)

      // 创建圆锥(半径，高，分段数)
      const cone = new THREE.Mesh(new THREE.ConeGeometry(5, 20, 20), material)
      cone.position.set(80, 0, 0)
      scene.add(cone)

      // 圆柱
      const cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 10, 20, 20),
        material
      )
      cylinder.position.set(120, 0, 0)
      scene.add(cylinder)

      // 球体
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(10, 30, 30),
        material
      )
      sphere.position.set(150, 0, 0)
      scene.add(sphere)

      // 平面
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(400, 400),
        new THREE.MeshBasicMaterial({ color: 0xdddddd })
      )
      plane.rotateX(Math.PI * -0.5)
      plane.position.set(50, -20, 0)
      scene.add(plane)

      // 圆环
      const Torus = new THREE.Mesh(
        new THREE.TorusGeometry(10, 3, 16, 100),
        material
      )
      Torus.position.set(180, 0, 0)
      scene.add(Torus)
    }

    const initCamera = () => {
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      )
      camera.position.set(0, 200, 300)
      camera.lookAt(scene.position)
    }
    const initLight = () => {
      const ambientLight = new THREE.AmbientLight(0x444444)
      const pointLight = new THREE.PointLight(0xffffff)
      pointLight.position.set(300, 200, 800)
      scene.add(ambientLight)
      scene.add(pointLight)
    }

    const resize = () => useResize(camera, renderer)

    const animate = () => {
      stats.update()
      renderer.render(scene, camera)
      // requestAnimationFrame(animate)
    }

    const initSceneHelp = () => {
      const axes = new THREE.AxesHelper(80)
      scene.add(axes)
    }
  }
})
</script>
