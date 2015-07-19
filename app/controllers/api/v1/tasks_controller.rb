class Api::V1::TasksController < ApplicationController
  def index
    @data = Task.all
  end

  def create
    @task = Task.create(task_params)
    render :show, status: :created
  end

  def update
    task = Task.find(params[:id])
    task.update(task_params)
    @data = Task.all
    render :index
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
  end

  private
  def task_params
    params.permit(:id, :title, :estimated_time, :actual_time, :completed)

  end
end
