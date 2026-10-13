module.exports={content:['./app/**/*.{js,jsx}','./components/**/*.{js,jsx}'],
theme:{extend:{fontFamily:{sans:['var(--font-inter)','system-ui','sans-serif']},
colors:{brand:{orange:'#F76820',red:'#C92C33',dark:'#2B2B2B'}},
keyframes:{fadeUp:{'0%':{opacity:0,transform:'translateY(8px)'},'100%':{opacity:1,transform:'none'}},slideIn:{'0%':{transform:'translateX(100%)'},'100%':{transform:'none'}},fade:{'0%':{opacity:0},'100%':{opacity:1}},
fadeIn:{'0%':{opacity:0},'100%':{opacity:1}},
slideUp:{'0%':{opacity:0,transform:'translateY(20px)'},'100%':{opacity:1,transform:'translateY(0)'}},
float:{'0%,100%':{transform:'translateY(0px)'},'50%':{transform:'translateY(-10px)'}},
gradientShift:{'0%,100%':{backgroundPosition:'0% 50%'},'50%':{backgroundPosition:'100% 50%'}}},
animation:{fadeUp:'fadeUp .45s ease-out both',slideIn:'slideIn .3s cubic-bezier(.16,1,.3,1)',fade:'fade .2s ease-out',fadeIn:'fadeIn 0.6s ease-out both',slideUp:'slideUp 0.8s ease-out both',float:'float 6s ease-in-out infinite',gradientShift:'gradientShift 8s ease infinite'}}},plugins:[]}
