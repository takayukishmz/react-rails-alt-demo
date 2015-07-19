class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.float :estimated_time
      t.float :actual_time
      t.boolean :completed

      t.timestamps
    end
  end
end
