console.log('configurator.js loaded');
let gridlayout;
let globalCarouselIndex = 0;
let globalSubCarouselIndex = 0;
let masterCarouselSpans = [];
let subCarouselSpans = [];
let rightArrow;
let subRightArrow;

let carouselOptions = ['Laminar Flow Hoods', 'Ductless Fume Hoods', 'Biosafety Cabinets', 'UV Box', 'DWS'];

let productFamilies =       [
                            ['PCR', 'HLF', 'VLF', 'FLOW'],
                            ['Purair Basic', 'ECO', 'EDU'],
                            ['Option 1', 'Option 2', 'Option 3'],
                            ['UVB', 'UVB', 'UVB'],
                            ['DWS']
                            ];



let catchphrases =  [
                    ['Our Highest-End Laminar Flow Cabinet', 'For when you gotta push that air sideways', 'Sanitize your workstation from above.', 'Our entry level laminar flow.'],
                    ['Our Best-Selling Product Line', 'Honestly not sure what this one is.', 'Test Value'],
                    ['What even is this', 'I dont know what our biosafety cabinets are', 'Ive been working here a whole year'],
                    ['Its a UV-Box', 'Theres only one UV-Box', 'Stop Trying to get More UV-Box options'],
                    ['Push that air downwards', 'How is this differnt from a VLF?', 'The best downards air station that isnt a VLF']
];


let blurb = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'];



buildCarousel(globalCarouselIndex);
function buildConfigurator(){
    buildCarousel();
    buildDropdownOptions();
    buildQuoteButtons();
    buildDescription();
    buildImage();
    buildProductName();
}


function buildCarousel(carouselIndex){
    var displayCarousel = [];
    for(var i = carouselIndex-1; i<carouselIndex+2; i++){

        if(i == -1){ // if -1, roll back to end of array.
            displayCarousel.push(carouselOptions[carouselOptions.length-1])

        }else if(i == carouselOptions.length){ //If out of bounds, roll to the 0 location
            displayCarousel.push(carouselOptions[0])
        
        }else{
            displayCarousel.push(carouselOptions[i])
        }
    }

    var div = document.createElement('div')
    div.classList.add('carousel-container')
    
    
    var span1 = document.createElement('span')
    var span2 = document.createElement('span')
    var span3 = document.createElement('span')
    var spanLeftArrow = document.createElement('span')
    var spanRightArrow = document.createElement('span')
    
    spanLeftArrow.innerHTML = '&#8592;';
    spanRightArrow.innerHTML = '&#8594;';
    spanLeftArrow.classList.add('carousel-subheading');
    spanRightArrow.classList.add('carousel-subheading');
    spanLeftArrow.onclick = function(){moveCarousel(false)}
    spanRightArrow.onclick = function(){moveCarousel(true)}


    span1.innerHTML = displayCarousel[0];
    span1.classList.add('carousel-subheading')
    //span1.onclick = function(){moveCarousel(false)}
    
    span2.innerHTML = displayCarousel[1];
    span2.classList.add('carousel-master')
    span2.classList.add('Absolute-Center')
    
    span3.innerHTML = displayCarousel[2];
    span3.classList.add('carousel-subheading')
    span3.classList.add('carousel-right')
    span3.onclick = function(){moveCarousel(true)}
    span3.appendChild(spanRightArrow)
    rightArrow = spanRightArrow;

    spanLeftArrow.appendChild(span1)

    div.appendChild(spanLeftArrow)
    //div.appendChild(span2);
    div.appendChild(span3);

    masterCarouselSpans = [spanLeftArrow, span3, span2];
    console.log(masterCarouselSpans)

    var target = document.getElementById('divProductConfigurator');
    target.innerHTML = '';
    target.appendChild(div);
    target.appendChild(span2)
    globalSubCarouselIndex = 0;
    buildSubCarousel(globalSubCarouselIndex)
}


function buildSubCarousel(carouselIndex){
    var target = document.getElementById('divProductConfigurator');
    var subCarouselOptions = productFamilies[globalCarouselIndex];
    //console.log(subCarouselOptions)

    var displayCarousel = [];
    for(var i = carouselIndex-1; i<carouselIndex+2; i++){

        if(i == -1){ // if -1, roll back to end of array.
            displayCarousel.push(subCarouselOptions[subCarouselOptions.length-1])

        }else if(i >= subCarouselOptions.length){ //If out of bounds, roll to the 0 location
            displayCarousel.push(subCarouselOptions[0])
        
        }else{
            displayCarousel.push(subCarouselOptions[i])
        }
    }

    //console.log(displayCarousel)

    var div = document.createElement('div')
    div.classList.add('carousel-container')
    
    
    var span1 = document.createElement('span')
    var span2 = document.createElement('span')
    var span3 = document.createElement('span')
    var spanLeftArrow = document.createElement('span')
    var spanRightArrow = document.createElement('span')
    
    spanLeftArrow.innerHTML = '&#8592;';
    spanRightArrow.innerHTML = '&#8594;';
    spanLeftArrow.classList.add('carousel-subheading');
    spanRightArrow.classList.add('carousel-subheading');
    subRightArrow = spanRightArrow;
    spanLeftArrow.onclick = function(){moveSubCarousel(false)}
    //spanRightArrow.onclick = function(){moveSubCarousel(true)}


    span1.innerHTML = displayCarousel[0];
    span1.classList.add('carousel-subheading')
    //span1.onclick = function(){moveSubCarousel(false)}
    
    span2.innerHTML = displayCarousel[1];
    span2.classList.add('carousel-master')
    span2.classList.add('Absolute-Center')
    span2.id = 'spanSelectedSubitem';
    
    span3.innerHTML = displayCarousel[2];
    span3.classList.add('carousel-subheading')
    span3.classList.add('carousel-right')
    span3.onclick = function(){moveSubCarousel(true)}
    span3.appendChild(spanRightArrow)

    spanLeftArrow.appendChild(span1)

    div.appendChild(spanLeftArrow)
    //div.appendChild(span2);
    div.appendChild(span3);

    subCarouselSpans = [spanLeftArrow, span3, span2];
    console.log(subCarouselSpans)

    div.id = 'divSubCarousel';
    target.appendChild(div)
    target.appendChild(span2)

    buildDescription();
}




function moveSubCarousel(dir){

    fadeForm();

    if(dir){
        globalSubCarouselIndex++;
        subCarouselSpans[1].classList.add('become-heading-from-right')
        subRightArrow.remove();
        subCarouselSpans[2].style.opacity = '0';
        if(globalSubCarouselIndex == productFamilies[globalCarouselIndex].length){
            globalSubCarouselIndex = 0;
        }
        setTimeout(function(){ reset(); buildSubCarousel(globalSubCarouselIndex); }, 500);
    }else{
        globalSubCarouselIndex--;
        subCarouselSpans[0].innerHTML = subCarouselSpans[0].innerHTML.substring(1);
        subCarouselSpans[0].classList.add('become-heading-from-left')
        subCarouselSpans[2].style.opacity = '0';
        if(globalSubCarouselIndex == -1){
            globalSubCarouselIndex = productFamilies[globalCarouselIndex].length-1;
        }
        setTimeout(function(){ reset(); buildSubCarousel(globalSubCarouselIndex); }, 500);
    }


}

function fadeForm(){
    document.getElementById('divName').classList.add('fade-out');
    document.getElementById('newContainer').classList.add('fade-out');
}

function reset(){
    document.getElementById('divName').remove();
    document.getElementById('newContainer').remove();
    document.getElementById('divSubCarousel').remove();
    document.getElementById('spanSelectedSubitem').remove();
}




function moveCarousel(dir){
    fadeForm();
    document.getElementById('divSubCarousel').classList.add('fade-out');
    subCarouselSpans[2].classList.add('fade-out')

    if(dir){
        globalCarouselIndex++;
        console.log(masterCarouselSpans[1])
        masterCarouselSpans[1].classList.add('become-heading-from-right')
        rightArrow.remove();
        masterCarouselSpans[2].style.opacity = '0';
        if(globalCarouselIndex == carouselOptions.length){
            globalCarouselIndex = 0;
        }
        setTimeout(function(){ buildCarousel(globalCarouselIndex); }, 500);
        
    }else{
        globalCarouselIndex--;
        masterCarouselSpans[0].innerHTML = masterCarouselSpans[0].innerHTML.substring(1);
        masterCarouselSpans[0].classList.add('become-heading-from-left')
        masterCarouselSpans[2].style.opacity = '0';
        if(globalCarouselIndex == -1){
            console.log('wrapping')
            globalCarouselIndex = carouselOptions.length-1;
        }
        setTimeout(function(){ buildCarousel(globalCarouselIndex); }, 500);
    }
}




function buildDropdownOptions(){

    var offerEnclosureOptions = true;

    var target = document.getElementById('newContainer');

    var div = document.createElement('div');
    div.style = 'margin-top: 40px;';


    var inputType = document.createElement('select');
    for(var i = 0; i<carouselOptions.length; i++){
        var option = document.createElement('option');
        option.innerHTML = carouselOptions[i];
        option.value = i;
        if(i == globalCarouselIndex){
            option.setAttribute('selected', true)
        }
        inputType.appendChild(option);
    }
    inputType.classList.add('option-dropdown')

    inputType.onchange = function(){
        globalCarouselIndex = this.value;
        buildCarousel(globalCarouselIndex);
    }

    var inputFamily = document.createElement('select');
    for(i = 0; i<productFamilies[globalCarouselIndex].length; i++){
        var option = document.createElement('option');
        option.innerHTML = productFamilies[globalCarouselIndex][i];
        option.value = productFamilies[globalCarouselIndex][i];
        if(i == globalSubCarouselIndex){
            option.setAttribute('selected', true)
        }
        inputFamily.appendChild(option);
    }
    inputFamily.classList.add('option-dropdown')
    
    inputFamily.onchange = function(){
        globalSubCarouselIndex = productFamilies[globalCarouselIndex].indexOf(this.value);
        document.getElementById('newContainer').remove();
        document.getElementById('divSubCarousel').remove();
        document.getElementById('spanSelectedSubitem').remove();
        document.getElementById('divName').remove();
        buildSubCarousel(globalSubCarouselIndex);
    }
    inputFamily.id = 'inputFamily';


    var sizes = [];
    if(inputFamily.value == 'HLF' || inputFamily.value == 'VLF'){
        sizes = [60, 72];
        offerEnclosureOptions = false;
    }else if(inputFamily.value == 'UVB'){
        sizes = [15];
        offerEnclosureOptions = false;
    }else{
        sizes = [24, 36, 48]
    }

    var inputSize = document.createElement('select');
    for(var i = 0; i<sizes.length; i++){
        var opt = document.createElement('option');
        opt.value = sizes[i];
        opt.innerHTML = sizes[i];
        inputSize.appendChild(opt);
    }
    inputSize.classList.add('option-dropdown')
    inputSize.id = 'inputSize';
    inputSize.onchange = function(){
        buildProductName(1);
    }


    var inputEnclosure = document.createElement('select');
    if(offerEnclosureOptions){
        var enclosures = ['XT Slanted', 'XTS Straight Legged', 'None '];
    }else{
        var enclosures = [];
    }
    for(i = 0; i<enclosures.length; i++){
        var opt = document.createElement('option');
        opt.innerHTML = enclosures[i];
        opt.value = enclosures[i].substring(0, enclosures[i].indexOf(' '))
        inputEnclosure.appendChild(opt)
    }
    inputEnclosure.classList.add('option-dropdown')
    inputEnclosure.id = 'inputEnclosure';
    inputEnclosure.oninput = function(){
        buildProductName(2);
    }
    

    var voltages = ['110v', '220v']
    var inputVoltage = document.createElement('select')
    inputVoltage.classList.add('option-dropdown')
    for(i = 0; i<voltages.length; i++){
        var opt = document.createElement('option');
        opt.innerHTML = voltages[i];
        if(i == 0){
            opt.value = 'A'
            opt.setAttribute('selected', true)
        }else{
            opt.value = 'G'
        }
        inputVoltage.appendChild(opt)
    }
    inputVoltage.id = 'inputVoltage';

    inputVoltage.onchange = function(){
        buildProductName(3);
    }


    var lblFamily = document.createElement('span');
    lblFamily.innerHTML = ':Family'
    lblFamily.classList.add('dropdown-lbl')

    var lblType = document.createElement('span')
    lblType.innerHTML = ':Type'
    lblType.classList.add('dropdown-lbl')

    var lblSize = document.createElement('span')
    lblSize.innerHTML = ':Size (in)'
    lblSize.classList.add('dropdown-lbl')

    var lblEncl = document.createElement('span')
    lblEncl.innerHTML = ':Enclosure Type'
    lblEncl.classList.add('dropdown-lbl')

    var lblVoltage = document.createElement('span')
    lblVoltage.innerHTML = ':Voltage'
    lblVoltage.classList.add('dropdown-lbl')


    var btnGetQuote = document.createElement('button')
    btnGetQuote.oninput = function(){
        console.log('bazooper')
    }
    btnGetQuote.innerHTML = 'Get Quote';
    btnGetQuote.classList.add('btn-submit')

    var btnGetFilters = document.createElement('button')
    btnGetFilters.classList.add('btn-submit')
    btnGetFilters.oninput = function(){
        console.log('bazooper')
    }
    btnGetFilters.innerHTML = 'Find Filters';

    
    div.appendChild(inputType);
    div.appendChild(lblType)
    div.appendChild(document.createElement('br'))
    div.appendChild(inputFamily)
    div.appendChild(lblFamily)
    div.appendChild(document.createElement('br'))
    div.appendChild(inputSize)
    div.appendChild(lblSize)
    div.appendChild(document.createElement('br'))
    div.appendChild(inputEnclosure)
    div.appendChild(lblEncl)
    div.appendChild(document.createElement('br'))
    div.appendChild(inputVoltage)
    div.appendChild(lblVoltage)
    div.appendChild(document.createElement('br'))
    div.appendChild(document.createElement('br'))
    div.appendChild(btnGetQuote)
    div.appendChild(btnGetFilters)
    target.appendChild(div);

    buildProductName();
}

function buildQuoteButtons(){

}

function buildDescription(){
    
    var target = document.getElementById('divProductConfigurator');

    var newContainer = document.createElement('div');
    newContainer.classList.add('optionsContainer')
    newContainer.id = 'newContainer';
    
    var divCatchphrase = document.createElement('div');
    divCatchphrase.classList.add('blocktext-bold');
    divCatchphrase.innerHTML = catchphrases[globalCarouselIndex][globalSubCarouselIndex];
    divCatchphrase.id = 'divCatchphrase';
    

    var span = document.createElement('span');
    span.id = 'spanDescription';
    span.classList.add('blocktext');
    span.innerHTML = blurb[0];

    var link = document.createElement('a');
    link.style = 'font-size: 6px;';
    link.style = 'margin-left: 20px';
    link.innerHTML = 'Learn More';
    link.href = '#';


    divCatchphrase.appendChild(span)
    divCatchphrase.appendChild(link)
    newContainer.appendChild(divCatchphrase);

    target.appendChild(newContainer)
    buildImage();

}

function buildImage(){
    var target = document.getElementById('newContainer');
    var img = document.createElement('img');
    img.src = "configuratorassets/" + productFamilies[globalCarouselIndex][globalSubCarouselIndex] + ".png";
    img.id = 'imgProduct';
    img.classList.add('product-img')
    img.classList.add('fade-in-fast')
    target.appendChild(img);

    buildDropdownOptions();
}

function buildProductName(indUpd){
    if(document.getElementById('divName')){
    document.getElementById('divName').remove();
    }
    var target = document.getElementById('divProductConfigurator')

    var pFam = productFamilies[globalCarouselIndex][globalSubCarouselIndex];
    var pSize = document.getElementById('inputSize').value;
    var pEnclosure = document.getElementById('inputEnclosure').value;
    var pVoltage = document.getElementById('inputVoltage').value;

    if(pFam == 'Purair Basic'){
        pFam = 'P5';
    }

    if(pEnclosure == 'None'){
        pEnclosure = '';
    }

    var productName =   pFam + '-' + 
                        pSize + '-' +
                        pEnclosure + '-' +
                        pVoltage;

                        console.log(productName)
        
    if(productName.indexOf('--') > -1){
        productName = productName.replace("--", "-");
    }


    var nameBroken = productName.split('-');
    console.log(nameBroken)

    if (nameBroken.length == 4){
        var nameSubcomponents = ['Family', 'Size', 'Enclosure', 'Voltage'];
    }else{
        var nameSubcomponents = ['Family', 'Size', 'Voltage'];
    }

    var div = document.createElement('div');
    div.classList.add('name-container')

    for(var i = 0; i<nameBroken.length; i++){
        var div2 = document.createElement('div');
        div2.innerHTML = '-' + nameBroken[i];
        if(i == 0){
        div2.innerHTML = div2.innerHTML.substring(1);
        }

        if(indUpd == i){
            div2.classList.add('animate-in-from-top')
        }

        div2.appendChild(document.createElement('br'));
        
        var span = document.createElement('span');
        span.style = 'font-size:14px; font-weight:100; margin-left: 20px;';
        

        span.innerHTML = nameSubcomponents[i];
        div2.appendChild(span);

        div.appendChild(div2)
    }




    //div.innerHTML = productName;
    div.id = 'divName';

    target.appendChild(div)


}