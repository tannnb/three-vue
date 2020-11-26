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

let renderer, scene, camera, controls, stats
export default defineComponent({
  setup () {
    onMounted(() => {
      initWebglRender()
      initScene()
      initCamera()
      initLight()
      initSceneHelp()
      initStats()
      initControls()
      initLine()
      animate()
      // controls.addEventListener('change', animate)
      window.addEventListener('resize', resize, false)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resize, false)
    })

    const initLine = () => {
      const geometry = new THREE.Geometry() // 几何体对象,几何体的vertices变量来存储点

      // vertexColors:定义线条材质是否使用顶点颜色,线条各部分的颜色会根据顶点的颜色来进行插值
      // Fog:定义材质的颜色是否受全局雾效的影响
      const material = new THREE.LineBasicMaterial({ vertexColors: true })

      // 定义一条直线
      const p1 = new THREE.Vector3(100, 0, 0)
      const p2 = new THREE.Vector3(100, 45, 200)
      geometry.vertices.push(p1)
      geometry.vertices.push(p2)
      geometry.colors.push(
        new THREE.Color(255, 255, 255),
        new THREE.Color(0xff0000)
      )
      const line = new THREE.Line(geometry, material)
      scene.add(line)

      // 定义一个三角形
      const geometry2 = new THREE.Geometry()
      const v1 = new THREE.Vector3(0, 50, 100)
      const v2 = new THREE.Vector3(200, 0, 0)
      const v3 = new THREE.Vector3(100, 0, 100 * Math.sqrt(3))
      geometry2.vertices.push(v1, v2, v3, v1) // 需要四个点才能构成三角形
      geometry2.colors.push(
        new THREE.Color(0xff0000),
        new THREE.Color(0x00ff00),
        new THREE.Color(0x0000ff),
        new THREE.Color(0xff0000)
      )
      const line2 = new THREE.Line(geometry2, material)
      scene.add(line2)

      // Line(用线条去连接几何体的顶点数据)、LineLoop(会将首位点连接起来)、LineSegments(定点不共享)
      const boxLine = new THREE.Line(
        new THREE.BoxGeometry(100, 100, 100),
        new THREE.LineBasicMaterial({ color: 0xff0000 })
      )
      boxLine.position.x = -100
      scene.add(boxLine)
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

    const initCamera = () => {
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      )
      camera.position.set(0, 1000, 0)
      camera.lookAt(scene.position)
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
      stats.update()
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
