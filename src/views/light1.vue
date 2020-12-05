<template>
  <div class="three_wrapper">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { useRenderer, useScene, useStats, useResize, useOrbitControls } from '../hook/useRenderer'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

let renderer, scene, camera, controls, stats, param, lightHelp, cameraHelp, directionalLight
export default defineComponent({
  setup () {
    onMounted(() => {
      renderer = useRenderer('canvas')
      scene = useScene()
      stats = useStats()
      initPerspective()
      initLight()
      initSceneHelp()
      initGui()
      initPlan()
      controls = useOrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      animate()
      window.addEventListener('resize', resize, false)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resize, false)
    })

    const initPlan = () => {
      const cylinder = new THREE.BoxGeometry(100, 50, 30)
      const material = new THREE.MeshLambertMaterial({ color: 0xff0000 })
      const mesh = new THREE.Mesh(cylinder, material)
      scene.add(mesh)
    }

    const initGui = () => {
      const ParamObj = function () {
        this.x = 0
        this.y = 0
        this.z = 0
      }
      param = new ParamObj()
      const datGui = new GUI()
      datGui.add(param, 'x', -10000, 10000).name('x轴位置').onChange(e => {
        param.x = e
      })
      datGui.add(param, 'y', -10000, 10000).name('y轴位置').onChange(e => {
        param.y = e
      })
      datGui.add(param, 'z', -10000, 10000).name('z轴位置').onChange(e => {
        param.z = e
      })
    }
    const updateData = () => {
      directionalLight.position.set(param.x, param.y, param.z)
    }

    const initLight = () => {
      const ambientLight = new THREE.AmbientLight(0x444444)
      directionalLight = new THREE.DirectionalLight(0xffffff)
      directionalLight.position.set(300, 200, 800)
      lightHelp = new THREE.DirectionalLightHelper(directionalLight)
      cameraHelp = new THREE.CameraHelper(directionalLight.shadow.camera)
      // scene.add(ambientLight)
      scene.add(lightHelp)
      // scene.add(cameraHelp)
      scene.add(directionalLight)
    }

    const initPerspective = () => {
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      )
      camera.position.set(100, 300, 2000)
      camera.lookAt(scene.position)
    }

    const resize = () => useResize(renderer, camera)

    const animate = () => {
      stats.update()
      updateData()
      lightHelp.update()
      cameraHelp.update()
      // requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    const initSceneHelp = () => {
      const axes = new THREE.AxesHelper(200)
      scene.add(axes)
    }
  }
})
</script>
