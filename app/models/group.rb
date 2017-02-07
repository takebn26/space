class Group < ApplicationRecord
  has_many :users, through: :group_users
  has_many :group_users, dependent: :destroy
end
