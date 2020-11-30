<template>
  <div class="three_wrapper">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

let renderer, scene, camera, controls, stats, param
export default defineComponent({
  setup () {
    onMounted(() => {
      initWebglRender()
      initScene()
      // initPerspective()
      initOrthographic()
      initLight()
      initSceneHelp()
      initStats()

      initGui()

      initPlan()

      initControls()
      animate()
      window.addEventListener('resize', resize, false)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resize, false)
    })

    const initPlan = () => {
      const cylinder = new THREE.CylinderGeometry(20, 30, 100)
      const material = new THREE.MeshLambertMaterial({ color: 0xff0000 })
      const mesh = new THREE.Mesh(cylinder, material)
      scene.add(mesh)
    }

    const initGui = () => {
      const ParamObj = function () {
        this.camera = 'Perspective'
        this.cameras = ['Orthographic', 'Perspective'] // 相机
      }
      param = new ParamObj()
      const datGui = new GUI()
      datGui.add(param, 'camera').options(param.cameras).name('相机').onChange(e => {
        e === 'Orthographic' ? initOrthographic() : initPerspective()
        initControls()
      })
    }

    const initPerspective = () => {
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      )
      camera.position.set(100, 300, 100)
      camera.lookAt(scene.position)
    }

    const initOrthographic = () => {
      camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, -window.innerHeight / 2, window.innerHeight, 0.1, 1000)
      camera.position.set(100, 300, 100)
      // camera.lookAt(scene.position)
    }

    const initWebglRender = () => {
      renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas'),
        antialias: true, // 抗锯齿,设置为false可以提高渲染性能
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0xb9d3ff, 1)
    }

    const initScene = () => {
      scene = new THREE.Scene()
    }

    const initLight = () => {
      const ambientLight = new THREE.AmbientLight(0x444444)
      const pointLight = new THREE.PointLight(0xffffff)
      pointLight.position.set(300, 200, 800)
      scene.add(ambientLight)
      scene.add(pointLight)
    }

    const initStats = () => {
      stats = new Stats()
      document.body.appendChild(stats.dom)
    }

    const initControls = () => {
      controls && controls.dispose()
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
    }

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight) // 重设渲染器宽高比
      camera.aspect = window.innerWidth / window.innerHeight // 重设相机宽高比
      camera.updateProjectionMatrix() // 更新相机，重新计算投影矩阵
    }

    const animate = () => {
      stats.update()
      camera.updateProjectionMatrix()
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    const initSceneHelp = () => {
      const axes = new THREE.AxesHelper(200)
      scene.add(axes)
    }
  }
})
</script>
