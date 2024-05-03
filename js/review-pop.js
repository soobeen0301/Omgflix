export function openModal(){
    document.getElementById('popOpen').addEventListener('click', function(){
        document.querySelector('.popWrap').style.display = 'flex'
    })
}

export function closeModal(){
    document.getElementById('popClose').addEventListener('click', function(){
        document.querySelector('.popWrap').style.display = 'none';
    })
}