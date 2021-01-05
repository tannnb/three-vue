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
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let renderer, scene, camera, controls, stats, INTERSECTED
export default defineComponent({
  setup () {
    onMounted(() => {
      renderer = useRenderer('canvas')
      scene = useScene()
      stats = useStats()
      initCamera()
      initLight()
      // initSceneHelp()
      initLoader()
      initBox()
      initGeometry()

      controls = useOrbitControls(camera, renderer.domElement)
      controls.enableDamping = true

      animate()
      window.addEventListener('resize', resize, false)
      window.addEventListener('click', onDocumentMouseMove, false)
      // controls.addEventListener('change', animate)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resize, false)
    })

    const onDocumentMouseMove = (event) => {
      event.preventDefault()
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)
      if (intersects.length > 0) {
        INTERSECTED = intersects[0].object
        const mesh = createLine(INTERSECTED)
        INTERSECTED.add(mesh)
        console.log(INTERSECTED)
      }
    }

    const createLine = (geo) => {
      const edges = new THREE.EdgesGeometry(geo.geometry)
      const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
      const mesh = new THREE.LineSegments(edges, edgesMaterial)
      return mesh
    }

    const getCenter = (model) => {
      return new THREE.Box3().setFromPoints(model)
    }

    const initBox = () => {
      const material = new THREE.MeshNormalMaterial()
      const geometry = new THREE.BoxGeometry(20, 20, 20)
      const box = new THREE.Mesh(geometry, material)
      scene.add(box)
    }

    const initLoader = () => {
      const loader = new FBXLoader()
      loader.setPath('models/')
      loader.load('A_market.fbx', fbx => {
        fbx.position.z = -50
        const arr = []
        const geometry = new THREE.Geometry()
        // fbx.traverse(obj => {
        //   if (obj.isMesh) {
        //     arr.push(obj)
        //     const item = new THREE.Geometry().fromBufferGeometry(obj.geometry)
        //     geometry.merge(item)
        //   }
        // })
        // const mesh = new THREE.Mesh(geometry,new THREE.MeshLambertMaterial())
        scene.add(fbx)
      })
    }

    const initGeometry = () => {

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
      requestAnimationFrame(animate)
    }

    const initSceneHelp = () => {
      const axes = new THREE.AxesHelper(80)
      scene.add(axes)
    }
  }
})
</script>
