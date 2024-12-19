export async function GET(req, res) {
  try {
    return Response.json({
      message: "Hello, Welcome to MockAi api"
    }, {
      status: 200,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      }, {
      status: 500,
    }
    );
  }
}
