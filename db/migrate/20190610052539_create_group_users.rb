class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.reference :group , foreign_key: true
      t.reference :user,foreign_key: true
      t.timestamps
    end
  end
end
