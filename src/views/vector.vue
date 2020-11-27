<template>
  <div class="three_wrapper">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import { defineComponent, onMounted } from 'vue'
import * as THREE from 'three'

let renderer, scene, camera
export default defineComponent({
  setup () {
    onMounted(() => {
      initWebglRender()
      initScene()
      initCamera()
      initLight()
      clone()
    })

    const clone = () => {
      const p1 = new THREE.Vector3(10, 8, 12)
      const p2 = new THREE.Vector3(20, 30, -10)
      const p3 = new THREE.Vector3()
      // 向量clone方法会直接克隆一份原来的对象(不影响原对象)
      const l = p1.clone().sub(p2)
      console.log(l) // x: -10, y: -22, z: 22
      console.log(l.length(), l, p1)

      const _p3 = p3.copy(p1) // p3拷贝p1的值赋值给自己
      console.log('p3', _p3)

      // 向量的叉乘(几何意义:得到两向量决定的平面的法向量)
      const p4 = new THREE.Vector3(1, 2, 3)
      const p5 = new THREE.Vector3(5, 5, 5)
      // console.log('---', p4.cross(p5), p4) 会改变p4的值
      const p6 = new THREE.Vector3()
      p6.crossVectors(p4, p5)
      console.log('p6:', p6)
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
  }
})
</script>
