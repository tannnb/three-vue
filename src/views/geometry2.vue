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
      initPlan()
      initGeo()

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
      const geometry = new THREE.BoxGeometry(20, 20, 20)
      const geometryBuffer = new THREE.BoxBufferGeometry(20, 20, 20)

      // 创建正方体
      const box = new THREE.Mesh(geometry, material)
      console.log('几何体数据结构', geometry)
      console.log('顶点位置数据', geometry.vertices)
      console.log('顶点纹理坐标', geometry.faceVertexUvs)
      console.log('几何体三角形信息', geometry.faces)
      console.log('----')

      console.log('几何体数据结构', geometryBuffer)
      console.log(
        '顶点位置、法向量、UV、颜色顶点等数据集合',
        geometryBuffer.attributes
      )
      console.log('顶点位置数据', geometryBuffer.attributes.position)
      console.log('顶点索引数据', geometryBuffer.index)
      const box2 = new THREE.Mesh(geometryBuffer, material)
      box2.position.x = 80
      scene.add(box2)
      scene.add(box)
    }

    const initPlan = () => {
      const plan = new THREE.PlaneGeometry(20, 20, 2, 2)
      const material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
      })

      const color1 = new THREE.Color('#4cff6a')
      const color2 = new THREE.Color('#5dffe6')
      const color3 = new THREE.Color('#ff6f32')
      // 给每个面，设置顶点颜色
      for (let i = 0; i < plan.faces.length; i++) {
        const face = plan.faces[i]
        face.vertexColors[0] = color1
        face.vertexColors[1] = color2
        face.vertexColors[2] = color3
      }
      const mesh = new THREE.Mesh(plan, material)
      mesh.position.set(40, 0, 0)
      scene.add(mesh)
    }

    // 构造一个三角面
    const initGeo = () => {
      // 构造原始Geometry
      const geometry = new THREE.Geometry()
      const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors })
      const color1 = new THREE.Color('#4cff6a')
      const color2 = new THREE.Color('#5dffe6')
      const color3 = new THREE.Color('#ff6f32')

      // 创建顶点向量
      const p1 = new THREE.Vector3(100, 0, 0)
      const p2 = new THREE.Vector3(0, 100, 0)
      const p3 = new THREE.Vector3(-100, 0, 0)

      // 添加点位
      geometry.vertices.push(p1)
      geometry.vertices.push(p2)
      geometry.vertices.push(p3)

      // 添加索引
      const face = new THREE.Face3(0, 1, 2)
      face.vertexColors[0] = color1
      face.vertexColors[1] = color2
      face.vertexColors[2] = color3

      geometry.faces.push(face)
      
      console.log(geometry)
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(0, 0, -50)
      scene.add(mesh)
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
