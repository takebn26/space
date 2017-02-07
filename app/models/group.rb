class Group < ApplicationRecord
  has_many :users, through: :groups_users
  has_many :groups_users, dependent: :destroy
end
