import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function useRenderer (canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById(canvas),
    antialias: true, // 抗锯齿,设置为false可以提高渲染性能
    alpha: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xb9d3ff, 1)
  return renderer
}

export function useScene () {
  return new THREE.Scene()
}

export function useStats () {
  const stats = new Stats()
  document.body.appendChild(stats.dom)
  return stats
}

export function useResize (camera, renderer) {
  renderer.setSize(window.innerWidth, window.innerHeight) // 重设渲染器宽高比
  camera.aspect = window.innerWidth / window.innerHeight // 重设相机宽高比
  camera.updateProjectionMatrix() // 更新相机，重新计算投影矩阵
}

export function useOrbitControls (camera, renderer) {
  let controls = null
  controls && controls.dispose()
  controls = new OrbitControls(camera, renderer)
  return controls
}

export function useSceneHelp (size = 100) {
  return new THREE.AxesHelper(size)
}

export function usePerspective (position) {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  )
  camera.position.set(100, 300, 2000)
  camera.lookAt(position)
}
