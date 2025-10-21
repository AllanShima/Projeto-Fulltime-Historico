import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../../services/firebase';


const Avatar = ({fullName=null, showName=false, profileUrl=null, customSize=null}) => {

    let separatedName = [];
    
    // ✅ 1. Use uma string vazia como fallback para evitar que fullName seja nulo/undefined
    const nameToUse = fullName || '';

    // 2. Separa o nome
    separatedName = nameToUse.split(" ");
    
    // 3. Acesso Seguro aos Nomes
    // Pega o primeiro nome, ou 'U' se não houver
    const firstName = separatedName[0] || 'U'; 
    
    // Pega o último elemento do array (o sobrenome), ou 'N' se só houver um nome
    const lastName = separatedName.length > 1 
                     ? separatedName[separatedName.length - 1] 
                     : (separatedName[0].length > 1 ? separatedName[0] : 'N'); // Garantir que não seja só a primeira letra

    // 4. Cria a abreviação de forma segura
    const firstInitial = firstName[0] || '';
    const lastInitial = (lastName && lastName !== firstName) ? lastName[0] : '';
    
    const abbreviation = (firstInitial + lastInitial).toUpperCase();

    const customSizeStyle = customSize !== null ? {width: `${customSize}px`, height: `${customSize}px`} : {};

  return (
    <div className='grid grid-flow-col content-center justify-center items-center text-primary font-regular'>
      {profileUrl !== null ? (
        <div style={{
          backgroundImage: `url(${profileUrl})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          ...customSizeStyle
        }} className={`grid content-center justify-center w-8 h-8 rounded-full bg-gray-200`}/>
      ) : (
        <div style={{ ...customSizeStyle }} className={`grid content-center justify-center w-10 h-10 rounded-full bg-gray-200`}>
          {abbreviation}
        </div>        
      )}

      {showName===true ? <span className='pl-1'>{fullName}</span> : null}
    </div>
  )
}

export default Avatar
