<template>
  <div class="three_wrapper">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let renderer, scene, camera, controls
export default defineComponent({
  setup () {
    onMounted(() => {
      initWebglRender()
      initScene()
      initCamera()
      initLight()
      initSceneHelp()
      initBox()
      initControls()
      animate()
      window.addEventListener('resize', resize, false)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resize, false)
    })

    const initBox = () => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(30, 30, 30),
        new THREE.MeshNormalMaterial()
      )
      scene.add(mesh)
    }

    const initWebglRender = () => {
      renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas'),
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0xb9d3ff, 1)
    }

    const initScene = () => {
      scene = new THREE.Scene()
    }

    const initCamera = () => {
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 7000)
      camera.position.set(100, 100, 400)
      camera.lookAt(scene.position)
    }
    const initLight = () => {
      const ambientLight = new THREE.AmbientLight(0x444444)
      const pointLight = new THREE.PointLight(0xffffff)
      pointLight.position.set(300, 200, 800)
      scene.add(ambientLight)
      scene.add(pointLight)
    }

    const initControls = () => {
      controls = new OrbitControls(camera, renderer.domElement)
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      controls.enableDamping = true
      // 是否可以缩放
      // controls.enableZoom = true
      // //设置相机距离原点的最远距离
      // controls.minDistance = 1
      // //设置相机距离原点的最远距离
      // //  controls.maxDistance = 200
      // //是否开启右键拖拽
      // controls.enablePan = false
    }

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight) // 重设渲染器宽高比
      camera.aspect = window.innerWidth / window.innerHeight // 重设相机宽高比
      camera.updateProjectionMatrix() // 更新相机，重新计算投影矩阵
    }

    const animate = () => {
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    const initSceneHelp = () => {
      const axes = new THREE.AxesHelper(80)
      scene.add(axes)
    }
  }
})
</script>
