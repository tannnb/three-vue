<template>
  <div class="three_wrapper">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import Stats from 'three/examples/jsm/libs/stats.module'

let renderer, scene, camera, controls, obj, stats, param
export default defineComponent({
  setup () {
    onMounted(() => {
      initWebglRender()
      initScene()
      initCamera()
      initLight()
      initSceneHelp()
      initStats()
      initGui()

      initBox()
      initTween()

      initControls()
      animate()
      window.addEventListener('resize', resize, false)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resize, false)
    })

    const initBox = () => {
      obj = new THREE.Object3D()
      const geometry = new THREE.CylinderGeometry(20, 15, 50, 20) // 圆柱几何体： 顶部半径，底部半径，高度,细分
      const material = new THREE.MeshLambertMaterial({ color: 0xFFAA00 })
      const mesh = new THREE.Mesh(geometry, material)
      obj.add(mesh)
      obj.position.x = -40
      obj.add(new THREE.AxesHelper(50))
      scene.add(obj)
    }
    const initTween = () => {
      new TWEEN.Tween(obj.rotation).to({ y: 360, z: 360, x: 360 }, 1000000).repeat(Infinity).start()
    }

    const initGui = () => {
      const ParamObj = function () {
        this.fov = 45 // 相机视角
      }
      param = new ParamObj()
      const datGui = new GUI()
      datGui.add(param, 'fov', 0, 180).name('视角大小')
    }
    const initStats = () => {
      stats = new Stats()
      document.body.appendChild(stats.dom)
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

    const updateFov = () => {
      // 设置相机视角，需要手动改updateProjectionMatrix来更新
      camera.fov = param.fov
      camera.updateProjectionMatrix()
    }

    const animate = () => {
      stats.update()
      updateFov()
      TWEEN.update()
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
