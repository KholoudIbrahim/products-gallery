import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user.model';
// import { UserService } from '../../services/user.service';
// import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  newUser: User = { id: 0, username: '', email: '', password: '' };
  searchTerm = '';

  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;

  toastMessage = '';
  toastSuccess = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  search(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(
      (u) =>
        u.username.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }

  openAddModal(): void {
    this.newUser = { id: 0, username: '', email: '', password: '' };
    this.showAddModal = true;
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe({
      next: (user) => {
        this.showAddModal = false;
        this.showToast('User added successfully!', true);
        this.loadUsers();
      },
      error: () => this.showToast('Failed to add user', false),
    });
  }

  openEditModal(user: User): void {
    this.selectedUser = { ...user };
    this.showEditModal = true;
  }

  updateUser(): void {
    if (!this.selectedUser) return;
    this.userService.updateUser(this.selectedUser).subscribe({
      next: () => {
        this.showEditModal = false;
        this.showToast('User updated successfully!', true);
        this.loadUsers();
      },
      error: () => this.showToast('Failed to update user', false),
    });
  }

  confirmDelete(user: User): void {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  deleteUser(): void {
    if (!this.selectedUser) return;
    this.userService.deleteUser(this.selectedUser.id).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.showToast('User deleted!', true);
        this.loadUsers();
      },
      error: () => this.showToast('Failed to delete user', false),
    });
  }

  showToast(message: string, success: boolean): void {
    this.toastMessage = message;
    this.toastSuccess = success;
    setTimeout(() => (this.toastMessage = ''), 3000);
  }
}
