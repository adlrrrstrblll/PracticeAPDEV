// Lance Andrei T. Reyes S20

`timescale 1ns / 1ps

module boolean_function(F, A, B, C, D);
    input A, B, C, D;
    output F;

    // Intermediate signals for the maxterms
    wire m0, m1, m5, m8, m9, m13;

    // Maxterm 0: (A + B + C + D)
    // OR gate for maxterm 0
    or (m0, A, B, C, D);  

    // Maxterm 1: (A + B + ~C + D)
    // OR gate for maxterm 1
    or (m1, A, B, C, ~D);  

    // Maxterm 5: (~A + B + C + D)
    // OR gate for maxterm 5
    or (m5, A, ~B, C, ~D);  

    // Maxterm 8: (~A + B + ~C + ~D)
    // OR gate for maxterm 8
    or (m8, ~A, B, C, D); 

    // Maxterm 9: (A + B + ~C + D)
    // OR gate for maxterm 9
    or (m9, ~A, B, C, ~D);  

    // Maxterm 13: (A + ~B + C + ~D)
    // OR gate for maxterm 13
    or (m13, ~A, ~B, C, ~D); 

    // Final AND gate to combine all maxterms
    // AND gate for the final output
    and (F, m0, m1, m5, m8, m9, m13);  

endmodule
