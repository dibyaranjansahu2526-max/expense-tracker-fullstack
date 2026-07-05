package com.guddu.expensetracker.controller;

import org.springframework.http.ResponseEntity;
import com.guddu.expensetracker.entity.Expense;
import com.guddu.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // Save Expense
    @PostMapping
    public ResponseEntity<Expense> saveExpense(@Valid @RequestBody Expense expense) {

        Expense savedExpense = expenseService.saveExpense(expense);

        return ResponseEntity.ok(savedExpense);
    }

    // Get All Expenses
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {

        List<Expense> expenses = expenseService.getAllExpenses();

        return ResponseEntity.ok(expenses);
    }

    // Get Expense By ID
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {

        Expense expense = expenseService.getExpenseById(id);

        if (expense == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(expense);
    }

    // Update Expense
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id,
                                                 @Valid @RequestBody Expense expense) {

        System.out.println("PUT API HIT");

        Expense existingExpense = expenseService.getExpenseById(id);

        if (existingExpense == null) {
            return ResponseEntity.notFound().build();
        }

        existingExpense.setTitle(expense.getTitle());
        existingExpense.setAmount(expense.getAmount());
        existingExpense.setCategory(expense.getCategory());
        existingExpense.setDescription(expense.getDescription());
        existingExpense.setDate(expense.getDate());

        Expense updatedExpense = expenseService.saveExpense(existingExpense);

        return ResponseEntity.ok(updatedExpense);
    }

    // Delete Expense
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long id) {

        Expense expense = expenseService.getExpenseById(id);

        if (expense == null) {
            return ResponseEntity.notFound().build();
        }

        expenseService.deleteExpense(id);

        return ResponseEntity.ok("Expense Deleted Successfully");
    }
}