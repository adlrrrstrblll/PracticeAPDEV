$(document).ready(function(){
    // initialize the glasses
    let glasses = {
        1: {maxCap: 8, currentCap: 8, element: $('#glass1')},
        2: {maxCap: 5, currentCap: 0, element: $('#glass2')},
        3: {maxCap: 3, currentCap: 0, element: $('#glass3')}
    };
  
    function pourLiquid(source, destination) {
        if (source === destination) {
            return; // if same do return nothing
        }
  
        let src = glasses[source];
        let des = glasses[destination];
  
        let amountToPour = Math.min(src.currentCap, des.maxCap - des.currentCap);
  
        if (amountToPour > 0) {
            // remove source
            src.currentCap -= amountToPour;
            // add to des  
            des.currentCap += amountToPour;
            updateGlass();  // update the ui
        }
  
        validateWin();
    }

    function updateGlass() {
        Object.keys(glasses).forEach((key) => {
            let glass = glasses[key];
            // clear before updating
            glass.element.empty(); 
            for (let i = 0; i < glass.currentCap; i++) {
                glass.element.append('<div class="glass-fill"></div>');
            }
        });
    }
  
    function validateWin() {
        if (glasses[1].currentCap === 4 && glasses[2].currentCap === 4) {
            $('#win-message').css('display', 'inline-block');
        }
    }
  
    $("#pour-button").click(function() {
        let src = parseInt($('#from-input').val());
        let des = parseInt($('#to-input').val());
        pourLiquid(src, des);
    });
  
    updateGlass();
});