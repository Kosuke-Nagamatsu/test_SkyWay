require "test_helper"

class VideoCallsControllerTest < ActionDispatch::IntegrationTest
  test "should get chat" do
    get video_calls_chat_url
    assert_response :success
  end
end
