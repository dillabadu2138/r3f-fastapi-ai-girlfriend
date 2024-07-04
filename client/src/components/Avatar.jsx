import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";

export function Avatar(props) {
  const { nodes, materials, scene } = useGLTF("/models/Girlfriend.glb");
  const { animations } = useGLTF("/models/animations.glb");
  const group = useRef();
  const { actions } = useAnimations(animations, group);

  const [animation, setAnimation] = useState("Standing Idle");
  const [eyeBlinkLeft, setEyeBlinkLeft] = useState(false);
  const [eyeBlinkRight, setEyeBlinkRight] = useState(false);

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();

    return () => actions[animation].fadeOut(0.5);
  }, [animation]);

  useFrame(() => {
    // loop through all skinnedMeshes and update the morphTargetInfluences
    scene.traverse((child) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        child.morphTargetInfluences[
          child.morphTargetDictionary["eyeBlinkLeft"]
        ] = eyeBlinkLeft ? 1 : 0;
        child.morphTargetInfluences[
          child.morphTargetDictionary["eyeBlinkRight"]
        ] = eyeBlinkRight ? 1 : 0;
      }
    });
  });

  // leva UI
  useControls({
    애니메이션: {
      value: animation,
      options: animations.map((item) => item.name),
      onChange: (v) => setAnimation(v),
    },
    "왼쪽 윙크": button(() => {
      setEyeBlinkLeft(true);

      setTimeout(() => setEyeBlinkLeft(false), 500);
    }),
    "오른쪽 윙크": button(() => {
      setEyeBlinkRight(true);

      setTimeout(() => setEyeBlinkRight(false), 500);
    }),
  });

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("/models/Girlfriend.glb");
useGLTF.preload("/models/animations.glb");
