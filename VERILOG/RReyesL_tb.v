// Lance Andrei T. Reyes S20

`timescale 1ns / 1ps

module boolean_function_tb;

    // Declare inputs
    reg A, B, C, D;
    
    // Declare output
    wire F;
    
    boolean_function dut (F, A, B, C, D);

    initial begin
        $display("Lance Andrei T. Reyes");
        $display("Boolean Function: F(A, B, C, D) = πM(0, 1, 5, 8, 9, 13)");
        $display("Verilog Model Type: Gate-level");
        $display("A B C D | F");
    end

   initial begin
        // Apply combinations 0000 to 1111 sequentially
        for (integer i = 0; i < 16; i = i + 1) begin
            {A, B, C, D} = i;
            #10;
        end
        
        // Return to 0000 after completing the loop, sequentially
        // Set inputs back to 0000
        {A, B, C, D} = 4'b0000;  
        #10;  // Wait for 10ns
    end

    // Dump waveform for viewing in GTKWave
    initial begin
        // File to store the waveform data
        $dumpfile("RReyesL.vcd");  
        // Dump all variables from this module
        $dumpvars(0, boolean_function_tb);  
    end

    // Monitor inputs and output
    initial begin
        $monitor("%b %b %b %b | %b", A, B, C, D, F);
    end

endmodule
