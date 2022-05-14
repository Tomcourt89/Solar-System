import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { DoubleSide } from 'three'

const scene = new THREE.Scene()
// scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.x = 30
camera.position.y = 50
camera.position.z = 100

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0)

// Simulates realistic sunlight emitting from the center of the suns axis
const light1 = new THREE.PointLight()
light1.position.set(0, 0, 0)
scene.add(light1)

// Creates a light source that ignores all shadows
const light2 = new THREE.AmbientLight()

// Individual materials so that they can each have textures applied
const basicMaterial = new THREE.MeshBasicMaterial()
const mercMaterial = new THREE.MeshPhongMaterial()
const venMaterial = new THREE.MeshPhongMaterial()
const earthMaterial = new THREE.MeshPhongMaterial()
const marsMaterial = new THREE.MeshPhongMaterial()
const satMaterial = new THREE.MeshPhongMaterial()
const jupMaterial = new THREE.MeshPhongMaterial()
const nepMaterial = new THREE.MeshPhongMaterial()
const uraMaterial = new THREE.MeshPhongMaterial()
const satRingMat = new THREE.MeshPhongMaterial( { side: DoubleSide })

// Specific geometry for UV mapped saturn rings
const satRingGeometry = new THREE.RingBufferGeometry(7, 9, 64);
var pos = satRingGeometry.attributes.position;
var satVector = new THREE.Vector3();
for (let i = 0; i < pos.count; i++){
    satVector.fromBufferAttribute(pos, i);
    satRingGeometry.attributes.uv.setXY(i, satVector.length() < 8 ? 0 : 1, 1);
}

// Image maps for each of the planets
const sunMap = new THREE.TextureLoader().load("images/2k_sun.jpg")
const mercMap = new THREE.TextureLoader().load("images/2k_mercury.jpg")
const venMap = new THREE.TextureLoader().load("images/2k_venus_atmosphere.jpg")
const earthMap = new THREE.TextureLoader().load("images/2k_earth_daymap.jpg")
const marsMap = new THREE.TextureLoader().load("images/2k_mars.jpg")
const satMap = new THREE.TextureLoader().load("images/2k_saturn.jpg")
const jupMap = new THREE.TextureLoader().load("images/2k_jupiter.jpg")
const nepMap = new THREE.TextureLoader().load("images/2k_neptune.jpg")
const uraMap = new THREE.TextureLoader().load("images/2k_uranus.jpg")
const satRingMap = new THREE.TextureLoader().load("images/2k_saturn_ring_alpha.png")

const envTexture = new THREE.TextureLoader().load("images/2k_stars_milky_way.jpg")
scene.background = envTexture

// New meshes created for each planet in the solar system. Each planet is created as a child element, should the parent move, the children move with it.
// The sun is a child element of the scene.
// Each planets movement does not affect another planets movement with the exception of saturns rings which are a child element of saturn.
const sun = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(10,10),
    basicMaterial
)
basicMaterial.map = sunMap
sun.position.set(0, 0, 0)
scene.add(sun)
// sun.add(new THREE.AxesHelper(5))

const mercury = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(1,1),
    mercMaterial
)
// New "invisible" object created at point 0,0,0 which will rotate. As mercury is a child of this element it will rotate along with it.
// This allows for variable rotation speeds of each planet.
const mercAxis = new THREE.Object3D()
const mercOrbit = new THREE.Mesh(
    new THREE.RingGeometry(19.8,20.2,100),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)

mercMaterial.map = mercMap
mercury.position.set(20, 0, 0)
scene.add(mercAxis)
mercAxis.add(mercury)
mercOrbit.rotation.x = Math.PI / 2
// mercury.add(new THREE.AxesHelper(5))

const venus = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(2,2),
    venMaterial
)
const venAxis = new THREE.Object3D()
const venOrbit = new THREE.Mesh(
    new THREE.RingGeometry(29.8,30.2,100),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)

venMaterial.map = venMap
venus.position.set(0, 0, 30)
scene.add(venAxis)
venAxis.add(venus)
venOrbit.rotation.x = Math.PI / 2
// venus.add(new THREE.AxesHelper(5))

const earth = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(3,3),
    earthMaterial
)
const earthAxis = new THREE.Object3D()
const earthOrbit = new THREE.Mesh(
    new THREE.RingGeometry(39.8,40.2,100),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)

earthMaterial.map = earthMap
earth.position.set(-40, 0, 0)
scene.add(earthAxis)
earthAxis.add(earth)
earthOrbit.rotation.x = Math.PI / 2
// earth.add(new THREE.AxesHelper(5))

const mars = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(4,4),
    marsMaterial
)
const marsAxis = new THREE.Object3D()
const marsOrbit = new THREE.Mesh(
    new THREE.RingGeometry(49.8,50.2,100),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)

marsMaterial.map = marsMap
mars.position.set(50, 0, 0)
scene.add(marsAxis)
marsAxis.add(mars)
marsOrbit.rotation.x = Math.PI / 2
// mars.add(new THREE.AxesHelper(5))

const saturn = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(5,5),
    satMaterial
)

const satAxis = new THREE.Object3D()
const satOrbit = new THREE.Mesh(
    new THREE.RingGeometry(64.8,65.2,100),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)
const satRing = new THREE.Mesh(
    satRingGeometry,
    satRingMat
)
satMaterial.map = satMap
satRingMat.map = satRingMap
saturn.position.set(0, 0, -65)
scene.add(satAxis)
saturn.add(satRing)
satAxis.add(saturn)
saturn.rotation.x = Math.PI / 15
satRing.rotation.x = Math.PI / 2
satOrbit.rotation.x = Math.PI / 2
// saturn.add(new THREE.AxesHelper(5))

const jupiter = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(6,6),
    jupMaterial
)
const jupAxis = new THREE.Object3D()
const jupOrbit = new THREE.Mesh(
    new THREE.RingGeometry(79.8,80.2,100),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)

jupMaterial.map = jupMap
jupiter.position.set(-80, 0, 0)
scene.add(jupAxis)
jupAxis.add(jupiter)
jupOrbit.rotation.x = Math.PI / 2
// jupiter.add(new THREE.AxesHelper(5))

const neptune = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(5,5),
    nepMaterial
)
const nepAxis = new THREE.Object3D()
const nepOrbit = new THREE.Mesh(
    new THREE.RingGeometry(99.8,100.2,100),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)

nepMaterial.map = nepMap
neptune.position.set(100, 0, 0)
scene.add(nepAxis)
nepAxis.add(neptune)
nepOrbit.rotation.x = Math.PI / 2
// neptune.add(new THREE.AxesHelper(5))

const uranus = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(4,4),
    uraMaterial
)
const uraAxis = new THREE.Object3D()
const uraOrbit = new THREE.Mesh(
    new THREE.RingGeometry(119.8,120.2,100),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)

uraMaterial.map = uraMap
uranus.position.set(0, 0, -120)
scene.add(uraAxis)
uraAxis.add(uranus)
uraOrbit.rotation.x = Math.PI / 2
// uranus.add(new THREE.AxesHelper(5))

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// Raycaster to pickup element locations within the scene
const raycaster = new THREE.Raycaster()
const clickMouse = new THREE.Vector2()
var clickable: THREE.Object3D

// Data to be displayed to the user
// The Sun
sun.userData.clickable = true
sun.userData.name = 'The Sun'
sun.userData.description = 'is the only star in our solar system. It sits at the center, and its gravity holds the solar system together. Everything in our solar system revolves around it.'
sun.userData.size = 'has a diameter of around 1.39 million kilometers and is about 100 times wider than Earth and roughly 10 times wider than Jupiter (our largest planet)'
sun.userData.speed = 'does not orbit our solar system like our planets but instead orbits around the center of our galaxy "The Milky Way" at a velocity of 828,000 kilometers per hour.'
sun.userData.rotate = 'does in fact spin on its axis as with the planets in our solar system, however, because the sun is not a solid object, research suggests that the sun rotates once every 27 days along its equator and 31 days along its poles'
// Mercury
mercury.userData.clickable = true
mercury.userData.name = 'Mercury'
mercury.userData.description = 'is the only star in our solar system. It sits at the center, and its gravity holds the solar system together. Everything in our solar system revolves around it.'
mercury.userData.size = 'has a diameter of around 1.39 million kilometers and is about 100 times wider than Earth and roughly 10 times wider than Jupiter (our largest planet)'
mercury.userData.speed = 'does not orbit our solar system like our planets but instead orbits around the center of our galaxy "The Milky Way" at a velocity of 828,000 kilometers per hour.'
mercury.userData.rotate = 'does in fact spin on its axis as with the planets in our solar system, however, because the sun is not a solid object, research suggests that the sun rotates once every 27 days along its equator and 31 days along its poles'
// Venus
venus.userData.clickable = true
venus.userData.name = 'Venus'
venus.userData.description = 'is the only star in our solar system. It sits at the center, and its gravity holds the solar system together. Everything in our solar system revolves around it.'
venus.userData.size = 'has a diameter of around 1.39 million kilometers and is about 100 times wider than Earth and roughly 10 times wider than Jupiter (our largest planet)'
venus.userData.speed = 'does not orbit our solar system like our planets but instead orbits around the center of our galaxy "The Milky Way" at a velocity of 828,000 kilometers per hour.'
venus.userData.rotate = 'does in fact spin on its axis as with the planets in our solar system, however, because the sun is not a solid object, research suggests that the sun rotates once every 27 days along its equator and 31 days along its poles'
// Earth
earth.userData.clickable = true
earth.userData.name = 'Earth'
earth.userData.description = 'is the only star in our solar system. It sits at the center, and its gravity holds the solar system together. Everything in our solar system revolves around it.'
earth.userData.size = 'has a diameter of around 1.39 million kilometers and is about 100 times wider than Earth and roughly 10 times wider than Jupiter (our largest planet)'
earth.userData.speed = 'does not orbit our solar system like our planets but instead orbits around the center of our galaxy "The Milky Way" at a velocity of 828,000 kilometers per hour.'
earth.userData.rotate = 'does in fact spin on its axis as with the planets in our solar system, however, because the sun is not a solid object, research suggests that the sun rotates once every 27 days along its equator and 31 days along its poles'
// Mars
mars.userData.clickable = true
mars.userData.name = 'Mars'
mars.userData.description = 'is the only star in our solar system. It sits at the center, and its gravity holds the solar system together. Everything in our solar system revolves around it.'
mars.userData.size = 'has a diameter of around 1.39 million kilometers and is about 100 times wider than Earth and roughly 10 times wider than Jupiter (our largest planet)'
mars.userData.speed = 'does not orbit our solar system like our planets but instead orbits around the center of our galaxy "The Milky Way" at a velocity of 828,000 kilometers per hour.'
mars.userData.rotate = 'does in fact spin on its axis as with the planets in our solar system, however, because the sun is not a solid object, research suggests that the sun rotates once every 27 days along its equator and 31 days along its poles'
// Saturn
saturn.userData.clickable = true
saturn.userData.name = 'Saturn'
saturn.userData.description = 'is the only star in our solar system. It sits at the center, and its gravity holds the solar system together. Everything in our solar system revolves around it.'
saturn.userData.size = 'has a diameter of around 1.39 million kilometers and is about 100 times wider than Earth and roughly 10 times wider than Jupiter (our largest planet)'
saturn.userData.speed = 'does not orbit our solar system like our planets but instead orbits around the center of our galaxy "The Milky Way" at a velocity of 828,000 kilometers per hour.'
saturn.userData.rotate = 'does in fact spin on its axis as with the planets in our solar system, however, because the sun is not a solid object, research suggests that the sun rotates once every 27 days along its equator and 31 days along its poles'
// Jupiter
jupiter.userData.clickable = true
jupiter.userData.name = 'Jupiter'
jupiter.userData.description = 'is the only star in our solar system. It sits at the center, and its gravity holds the solar system together. Everything in our solar system revolves around it.'
jupiter.userData.size = 'has a diameter of around 1.39 million kilometers and is about 100 times wider than Earth and roughly 10 times wider than Jupiter (our largest planet)'
jupiter.userData.speed = 'does not orbit our solar system like our planets but instead orbits around the center of our galaxy "The Milky Way" at a velocity of 828,000 kilometers per hour.'
jupiter.userData.rotate = 'does in fact spin on its axis as with the planets in our solar system, however, because the sun is not a solid object, research suggests that the sun rotates once every 27 days along its equator and 31 days along its poles'
// Neptune
neptune.userData.clickable = true
neptune.userData.name = 'Neptune'
neptune.userData.description = 'is the only star in our solar system. It sits at the center, and its gravity holds the solar system together. Everything in our solar system revolves around it.'
neptune.userData.size = 'has a diameter of around 1.39 million kilometers and is about 100 times wider than Earth and roughly 10 times wider than Jupiter (our largest planet)'
neptune.userData.speed = 'does not orbit our solar system like our planets but instead orbits around the center of our galaxy "The Milky Way" at a velocity of 828,000 kilometers per hour.'
neptune.userData.rotate = 'does in fact spin on its axis as with the planets in our solar system, however, because the sun is not a solid object, research suggests that the sun rotates once every 27 days along its equator and 31 days along its poles'
// Uranus
uranus.userData.clickable = true
uranus.userData.name = 'Uranus'
uranus.userData.description = 'is the only star in our solar system. It sits at the center, and its gravity holds the solar system together. Everything in our solar system revolves around it.'
uranus.userData.size = 'has a diameter of around 1.39 million kilometers and is about 100 times wider than Earth and roughly 10 times wider than Jupiter (our largest planet)'
uranus.userData.speed = 'does not orbit our solar system like our planets but instead orbits around the center of our galaxy "The Milky Way" at a velocity of 828,000 kilometers per hour.'
uranus.userData.rotate = 'does in fact spin on its axis as with the planets in our solar system, however, because the sun is not a solid object, research suggests that the sun rotates once every 27 days along its equator and 31 days along its poles'



window.addEventListener('click', event => {
    if(clickable) {
        info.innerHTML = 'test'
        clickable = null as any
        return
    }
    clickMouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
    clickMouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1

    raycaster.setFromCamera(clickMouse, camera)
    const found = raycaster.intersectObjects(scene.children)
    if(found.length > 0 && found[0].object.userData.clickable) {
        clickable = found[0].object
        info.innerHTML =
            `<h2>${clickable.userData.name}</h2>
            <p>${clickable.userData.name} ${clickable.userData.description}</p>
            <p>${clickable.userData.name} ${clickable.userData.size}</p>
            <p>${clickable.userData.name} ${clickable.userData.speed}</p>
            <p>${clickable.userData.name} ${clickable.userData.rotate}</p>`
    }
})


 const data = {
    //  Lighting
    Lights: false,
    //  Spin
    PauseSpin: true,
    Sun: true,
    MercurySpin: true,
    VenusSpin: true,
    EarthSpin: true,
    MarsSpin: true,
    SaturnSpin: true,
    JupiterSpin: true,
    NeptuneSpin: true,
    UranusSpin: true,
    //  Orbit
    PauseOrbit: true,
    Mercury: true,
    Venus: true,
    Earth: true,
    Mars: true,
    Saturn: true,
    Jupiter: true,
    Neptune: true,
    Uranus: true,
    // Orbit Lines
    OrbitLines: false,
    MercuryLine: false,
    VenusLine: false,
    EarthLine: false,
    MarsLine: false,
    SaturnLine: false,
    JupiterLine: false,
    NeptuneLine: false,
    UranusLine: false,
 }

const gui = new GUI()
// Gui folder to toggle the lighting from realistic to zero shadows
const lightFolder = gui.addFolder('Lighting')
lightFolder.add(data, 'Lights').onChange(() => {
    if(data.Lights) {
        scene.add(light2)
        scene.remove(light1)
    } else {
        scene.remove(light2)
        scene.add(light1)
    }
})
// Gui folder to control orbits
const rotationFolder = gui.addFolder('Orbit')
rotationFolder.add(data, 'PauseOrbit')
const planetsOrbit = rotationFolder.addFolder('Planets')
planetsOrbit.add(data, 'Mercury')
planetsOrbit.add(data, 'Venus')
planetsOrbit.add(data, 'Earth')
planetsOrbit.add(data, 'Mars')
planetsOrbit.add(data, 'Saturn')
planetsOrbit.add(data, 'Jupiter')
planetsOrbit.add(data, 'Neptune')
planetsOrbit.add(data, 'Uranus')
// Gui folder to add or remove orbit lines
rotationFolder.add(data, 'OrbitLines').onChange(() => {
    if(data.OrbitLines) {
        scene.add(mercOrbit, venOrbit, earthOrbit, marsOrbit, satOrbit, jupOrbit, nepOrbit, uraOrbit)
    } else {
        scene.remove(mercOrbit, venOrbit, earthOrbit, marsOrbit, satOrbit, jupOrbit, nepOrbit, uraOrbit)
    }
})
const orbitLines = rotationFolder.addFolder('Orbit Lines')
orbitLines.add(data, 'MercuryLine').onChange(() => {
    if(data.MercuryLine) {
        scene.add(mercOrbit)
    } else {
        scene.remove(mercOrbit)
    }
})
orbitLines.add(data, 'VenusLine').onChange(() => {
    if(data.VenusLine) {
        scene.add(venOrbit)
    } else {
        scene.remove(venOrbit)
    }
})
orbitLines.add(data, 'EarthLine').onChange(() => {
    if(data.EarthLine) {
        scene.add(earthOrbit)
    } else {
        scene.remove(earthOrbit)
    }
})
orbitLines.add(data, 'MarsLine').onChange(() => {
    if(data.MarsLine) {
        scene.add(marsOrbit)
    } else {
        scene.remove(marsOrbit)
    }
})
orbitLines.add(data, 'SaturnLine').onChange(() => {
    if(data.SaturnLine) {
        scene.add(satOrbit)
    } else {
        scene.remove(satOrbit)
    }
})
orbitLines.add(data, 'JupiterLine').onChange(() => {
    if(data.JupiterLine) {
        scene.add(jupOrbit)
    } else {
        scene.remove(jupOrbit)
    }
})
orbitLines.add(data, 'NeptuneLine').onChange(() => {
    if(data.NeptuneLine) {
        scene.add(nepOrbit)
    } else {
        scene.remove(nepOrbit)
    }
})
orbitLines.add(data, 'UranusLine').onChange(() => {
    if(data.UranusLine) {
        scene.add(uraOrbit)
    } else {
        scene.remove(uraOrbit)
    }
})
// Gui folder to control spins
const spinFolder = gui.addFolder('Spin')
spinFolder.add(data, 'PauseSpin')
const planetsSpin = spinFolder.addFolder('Planets')
planetsSpin.add(data, 'Sun')
planetsSpin.add(data, 'MercurySpin')
planetsSpin.add(data, 'VenusSpin')
planetsSpin.add(data, 'EarthSpin')
planetsSpin.add(data, 'MarsSpin')
planetsSpin.add(data, 'SaturnSpin')
planetsSpin.add(data, 'JupiterSpin')
planetsSpin.add(data, 'NeptuneSpin')
planetsSpin.add(data, 'UranusSpin')


const stats = Stats()
document.body.appendChild(stats.dom)

const info = document.getElementById('info') as HTMLDivElement

function animate() {
    requestAnimationFrame(animate)

    // Animation controllers to adjust all the spins, or individual spins
    if(data.PauseSpin) {
        if(data.Sun) {
            sun.rotation.y += 0.0005
        }
        if(data.VenusSpin) {
            venus.rotation.y += 0.005
        }
        if(data.EarthSpin) {
            earth.rotation.y += 0.005
        }
        if(data.MarsSpin) {
            mars.rotation.y += 0.005
        }
        if(data.SaturnSpin) {
            saturn.rotation.y += 0.005
        }
        if(data.JupiterSpin) {
            jupiter.rotation.y += 0.005
        }
        if(data.NeptuneSpin) {
            neptune.rotation.y += 0.005
        }
        if(data.UranusSpin) {
            uranus.rotation.y += 0.005
        }
    }
    // Animation controllers to adjust all the orbits or individual orbits
    if(data.PauseOrbit) {
        if(data.Mercury) {
        mercAxis.rotation.y += 0.005
        }
        if(data.Venus) {
            venAxis.rotation.y += 0.002
        }
        if(data.Earth) {
            earthAxis.rotation.y += 0.0025
        }
        if(data.Mars) {
            marsAxis.rotation.y += 0.0015
        }
        if(data.Saturn) {
            satAxis.rotation.y += 0.002
        }
        if(data.Jupiter) {
            jupAxis.rotation.y += 0.0005
        }
        if(data.Neptune) {
            nepAxis.rotation.y += 0.0009
        }
        if(data.Uranus) {
            uraAxis.rotation.y += 0.00019
        }
    }

    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()